const mongoose = require("mongoose");

const studentAttendenceSchema = new mongoose.Schema({
  createdAt: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  adminAttendence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "adminAttendence",
  },
});

const studentAttendence = mongoose.model(
  "studentAttendence",
  studentAttendenceSchema
);

module.exports = studentAttendence;
