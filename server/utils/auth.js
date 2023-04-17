const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const { secret, expiration } = require('../config/auth');

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = (context) => {
  // context = { req }
  let token = context.req.headers.authorization;
  if (token) {
    token = token.split('Bearer ')[1];
  }

  if (!token) {
    throw new AuthenticationError('Missing or invalid authorization header');
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    context.user = data;
  } catch (err) {
    console.error(err);
    throw new AuthenticationError('Invalid token');
  }

  return context;
};

module.exports = { signToken, authMiddleware };
