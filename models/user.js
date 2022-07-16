const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (prop) => `Invalid Email: ${prop.value}`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password is too short"],
  },
  roles: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
  accountStatus: {
    type: String,
    required: true,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
