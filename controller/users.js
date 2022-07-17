const usersService = require("../service/user");
const authService = require("../service/auth");
const error = require("../utils/error");
const User = require("../models/user");

const getUser = async (req, res, next) => {
  try {
    const user = await usersService.findUsers();
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersService.findByProperty("_id", id);
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.ststus(202).json(user);
  } catch (e) {
    next(e);
  }
};

const putUserById = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
  getUser,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
