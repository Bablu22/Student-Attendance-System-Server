const mongoose = require("mongoose");

const adminAttendenceSchema = new mongoose.Schema(
  {
    timelimit: {
      type: Number,
      required: true,
      max: 30,
      min: 5,
      default: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["RUNNIGN", "COMPLETED"],
      default: "RUNNIGN",
    },
  },
  { timestamps: true }
);

const adminAttendence = mongoose.model(
  "adminAttendence",
  adminAttendenceSchema
);

module.exports = adminAttendence;
