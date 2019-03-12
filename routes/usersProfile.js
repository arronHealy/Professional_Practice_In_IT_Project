const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

const validateProfileInput = require("../validator/profile");

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

    profileFields.social = {};

    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }

    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }

    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }

    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
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

module.exports = router;
