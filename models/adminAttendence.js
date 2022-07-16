const mongoose = require("mongoose");

const adminAttendenceSchema = new mongoose.Schema({
  timelimit: Number,
  status: String,
  createdAt: Date,
});

const adminAttendence = mongoose.model(
  "adminAttendence",
  adminAttendenceSchema
);

module.exports = adminAttendence;
