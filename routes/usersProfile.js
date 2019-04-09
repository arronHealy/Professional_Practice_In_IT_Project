const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const validateProfileInput = require("../validator/profile");

const validateBookInput = require("../validator/book");

const validatePostInput = require("../validator/post");

//get profile and user models
const User = require("../models/User");

const Profile = require("../models/Profile");

//initial test route
router.get("/test", (req, res) => res.json({ msg: "profile route working" }));

//get current user passport protected route
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (!profile) {
          errors.notfound = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//get user by username

router.get("/username/:username", (req, res) => {
  const errors = {};

  Profile.findOne({ username: req.params.username })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.notfound = "There is no profile for this user!";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//get profile by user id

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params._id })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.notfound = "There is no profile for this user!";
        return res.status(404).json(errors);
      }

      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//get all profiles

router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", "name")
    .then(profiles => {
      if (!profiles) {
        errors.notfound = "There are no profiles!";
        return res.status(404).json();
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles!" }));
});

//post to create profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.username) {
      profileFields.username = req.body.username;
    }

    if (req.body.profileImage) {
      profileFields.profileImage = req.body.profileImage;
    }

    if (req.body.website) {
      profileFields.website = req.body.website;
    }

    if (req.body.location) {
      profileFields.location = req.body.location;
    }

    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }

    profileFields.socialLinks = {};

    if (req.body.youtube) {
      profileFields.socialLinks.youtube = req.body.youtube;
    }

    if (req.body.facebook) {
      profileFields.socialLinks.facebook = req.body.facebook;
    }

    if (req.body.twitter) {
      profileFields.socialLinks.twitter = req.body.twitter;
    }

    if (req.body.linkedin) {
      profileFields.socialLinks.linkedin = req.body.linkedin;
    }

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (profile) {
          //update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          //new profile

          //check username
          Profile.findOne({ username: profileFields.username }).then(
            profile => {
              if (profile) {
                errors.username = "That username already exists";
                return res.status(404).json(errors);
              }

              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            }
          );
        }
      });
  }
);

//create a post on users profile
router.post(
  "/posts/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ username: req.params.username })
      .then(profile => {
        const newPost = {
          user: req.user.id,
          post: req.body.post,
          name: req.user.name
        };

        profile.reviews.unshift(newPost);

        profile.save().then(profile => res.json(profile.reviews));
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete post by id

router.delete(
  "/posts/:profile_id/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.profile_id)
      .then(profile => {
        // Get remove index
        const removeIndex = profile.reviews
          .map(item => item.id)
          .indexOf(req.params.post_id);

        // Splice out of array
        profile.reviews.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile.reviews));
      })
      .catch(err => res.status(404).json(err));
  }
);

//get post by id
router.get("/profile-post/:profile_id/:post_id", (req, res) => {
  Profile.findById(req.params.profile_id)
    .then(profile => {
      if (profile) {
        const index = profile.reviews
          .map(item => item.id)
          .indexOf(req.params.post_id);

        res.json(profile.reviews[index]);
      } else {
        res.status(404).json({ nopost: "No profile found with that id" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});

// add comment to profile post

router.post(
  "/profile-comment/:profile_id/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findById(req.params.profile_id)
      .then(profile => {
        if (profile) {
          const index = profile.reviews
            .map(item => item.id)
            .indexOf(req.params.post_id);

          const newPost = {
            user: req.user.id,
            post: req.body.post,
            name: req.user.name
          };

          profile.reviews[index].comments.unshift(newPost);

          profile
            .save()
            .then(profile => res.json(profile.reviews[index].comments));
        } else {
          res.status(404).json({ nopost: "No profile found with that id" });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete profile posts comment by id

router.delete(
  "/profile-comment/:profile_id/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findById(req.params.profile_id)
      .then(profile => {
        // Get remove index
        const reviewIndex = profile.reviews
          .map(item => item.id)
          .indexOf(req.params.post_id);

        const commentIndex = profile.reviews[reviewIndex].comments
          .map(item => item.id)
          .indexOf(req.params.comment_id);

        // Splice out of array
        profile.reviews[reviewIndex].comments.splice(commentIndex, 1);

        // Save
        profile
          .save()
          .then(profile => res.json(profile.reviews[reviewIndex].comments));
      })
      .catch(err => res.status(404).json(err));
  }
);

//  POST book to profile

router.post(
  "/list-book",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        condition: req.body.condition,
        price: req.body.price,
        description: req.body.description
      };

      // Add to book array
      profile.books.unshift(newBook);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// DELETE book from profile

router.delete(
  "/list-book/:book_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.books
          .map(item => item.id)
          .indexOf(req.params.book_id);

        // Splice out of array
        profile.books.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// DELETE user and profile

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
