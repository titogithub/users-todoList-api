const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongotest');

mongoose.connection.on('open', function () {
  console.log('Mongoose connected.');
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
