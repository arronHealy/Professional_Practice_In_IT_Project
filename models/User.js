const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//user schema model
const UserSchema = {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

module.exports = User = mongoose.model("users", UserSchema);
