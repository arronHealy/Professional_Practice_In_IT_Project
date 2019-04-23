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
  },

  cartBooks: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      genre: {
        type: String
      },
      condition: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      description: {
        type: String
      },
      bookImage: {
        type: String
      }
    }
  ]
};

module.exports = User = mongoose.model("users", UserSchema);
