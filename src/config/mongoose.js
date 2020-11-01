const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on('open', function () {
  console.log('Mongoose connected.');
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
