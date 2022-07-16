const User = require("../models/user");

const findUsers = () => {
  return User.find();
};

const findByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : "STUDENT",
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

module.exports = { findByProperty, createUser, findUsers };
