const mongoose = require("mongoose");

function connectDB(connectionSTR) {
  return mongoose.connect(connectionSTR);
}

module.exports = connectDB;
