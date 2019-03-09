const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  //build profile for user
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
