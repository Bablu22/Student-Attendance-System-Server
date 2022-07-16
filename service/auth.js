const { findByProperty, createUser } = require("../service/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");
const User = require("../models/user");

const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findByProperty("email", email);
  if (user) {
    throw error("User Already exist", 400);
  }

  const hash = await bcrypt.hash(password, 10);
  return createUser({ name, email, password: hash, roles, accountStatus });
};

const loginService = async ({ email, password }) => {
  const user = await findByProperty("email", email);
  if (!user) {
    throw error("Invalid credential", 400);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw error("Invalid credential", 400);
  }
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = { registerService, loginService };
