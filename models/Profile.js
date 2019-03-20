const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  //build profile for user
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String,
    required: true
  },
  profileImage: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  books: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      publishedDate: {
        type: Date
      },
      description: {
        type: String,
        required: true
      },
      bookImage: {
        type: String
      }
    }
  ],
  socialLinks: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    linkedin: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
