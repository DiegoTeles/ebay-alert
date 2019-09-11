const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/test-ebay?authSource=admin`, {
  autoReconnect: true,
  useNewUrlParser: true,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;

module.exports = mongoose;