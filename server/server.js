const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schemas/typeDefs');
const books = require('./models/book');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

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

  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Connect to the MongoDB database and start the server
  await client.connect();
  const db = client.db('mydb');
  const collection = db.collection('users');
  console.log('Connected to MongoDB');

  const PORT = 4000;
  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
