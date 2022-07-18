const StudentAttendence = require("../models/studentAttendence");
const AdminAttendence = require("../models/adminAttendence");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getAttendance = async (req, res, next) => {
  const { id } = req.params;

  try {
    /**
     * Step 1 - Find admin attendance by id
     * Step 2 - Check if it is running or not
     * Step 3 - Check already register or not
     * Step 4 - Register entry
     */

    const adminAttendance = await AdminAttendence.findById(id);

    if (!adminAttendance) {
      throw error("Invalid Attendance ID", 400);
    }

    if (adminAttendance.status === "COMPLETED") {
      throw error("Attendance already completed");
    }

    let attendance = await StudentAttendence.findOne({
      user: req.user._id,
      adminAttendence: id,
    });

    if (attendance) {
      throw error("Already registered", 400);
    }

    attendance = new StudentAttendence({
      user: req.user._id,
      adminAttendence: id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (e) {
    next(e);
  }
};

const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendence.findOne({ status: "RUNNIGN" });
    if (!running) {
      throw error("Not Running", 400);
    }

    const started = addMinutes(new Date(running.createdAt), running.timelimit);
    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAttendance,
  getAttendanceStatus,
};
