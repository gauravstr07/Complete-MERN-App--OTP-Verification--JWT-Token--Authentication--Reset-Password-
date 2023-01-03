const mongoose = require("mongoose");

const connect = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect("mongodb://localhost:27017/daily-auth")
    .then(() => {
      console.log(`connected to database..💾`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
