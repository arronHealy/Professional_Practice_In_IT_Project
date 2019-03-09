const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

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

module.exports = router;
