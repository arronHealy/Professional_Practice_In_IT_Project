const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const Post = require("../models/Post");

const Profile = require("../models/Profile");

const validatePostInput = require("../validator/post");

//test route is working
router.get("/test", (req, res) => res.json({ msg: "posts working" }));

//get all posts
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "No posts found" }));
});

//get post by id
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopost: "No post found with that id" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

//create a post route
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
      name: req.user.name
    });

    newPost.save().then(post => res.json(post));
  }
);

//delete post by id

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ autherror: "User not authorized" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// add comment to post by id

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          user: req.user.id,
          post: req.body.post,
          name: req.body.name
        };

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ notfound: "No post found" }));
  }
);

// delete comment by id
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ notfound: "Comment doesn't exist" });
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(() => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
