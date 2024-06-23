const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean!
        },

        type Query {
        getTodos: [Todo]
        }
        `,
    resolvers: {},
  });

  app.use(cors());
  app.use(bodyParser.json());

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen({ port: 4000 }, () => {
    console.log("Server is running on port 4000");
  });
}

startApolloServer();
