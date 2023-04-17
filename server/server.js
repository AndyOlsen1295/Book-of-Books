const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schemas/typeDefs');
const books = require('./models/book');

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });
  const PORT = 4000;
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
