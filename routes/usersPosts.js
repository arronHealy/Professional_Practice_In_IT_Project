const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const Post = require("../models/Post");

const validatePostInput = require("../validator/post");

router.get("/test", (req, res) => res.json({ msg: "posts working" }));

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      post: req.body.post,
      name: req.body.name
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
