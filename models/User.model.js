const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide unique username"],
      unique: [true, "Username exist "],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      unique: false,
    },
    email: {
      type: String,
      require: [true, "Please provide email"],
      unique: [true, "Email id exist"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
