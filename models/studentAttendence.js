const mongoose = require("mongoose");

const studentAttendenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminAttendence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminAttendence",
      required: true,
    },
  },
  { timestamps: true }
);

const studentAttendence = mongoose.model(
  "studentAttendence",
  studentAttendenceSchema
);

module.exports = studentAttendence;
