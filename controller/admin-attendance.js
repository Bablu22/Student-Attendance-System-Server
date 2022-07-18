const AdminAtendance = require("../models/adminAttendence");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAtendance.findOne({ status: "RUNNIGN" });
    if (running) {
      throw error("Already Running", 400);
    }
    const attendance = new AdminAtendance({});
    await attendance.save();

    return res.status(201).json({ message: "Success", attendance });
  } catch (e) {
    next(e);
  }
};

const getStatus = async (req, res, next) => {
  try {
    const running = await AdminAtendance.findOne({ status: "RUNNIGN" });
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

const getdisable = async (req, res, next) => {
  try {
    const running = await AdminAtendance.findOne({ status: "RUNNIGN" });
    if (!running) {
      throw error("Not Running", 400);
    }
    running.status = "COMPLETED";
    await running.save();
    return res.status(200).json(running);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getEnable,
  getdisable,
  getStatus,
};
