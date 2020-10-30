/* eslint-disable no-mixed-spaces-and-tabs */
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const dataStoredInToken = {
    user : data,
  };
  return jwt.sign(dataStoredInToken, process.env.TOKEN_KEY, {expiresIn: process.env.TOKEN_LIFE});
};

const verify = (token) => {
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch(error) {
    throw new Error(error);
  }
};

module.exports = {
  createToken,
  verify
};