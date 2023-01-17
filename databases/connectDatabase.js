const mongoose = require('mongoose');
const log = require('../tools/index');

const connectDatabase = () => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('MongoDB Connection Successful');
    })
    .catch((err) => {
      log.error(err);
    });
};

module.exports = connectDatabase;
