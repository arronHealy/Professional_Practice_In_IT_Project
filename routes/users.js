const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const passport = require("passport");

const keys = require("../configuration/SecurityKeys");

//use model for user
const User = require("../models/User");

//load input validation
const validateRegisterInput = require("../validator/register");
const validateLoginInput = require("../validator/login");

//test route
//router.get("/test", (req, res) => res.json({ msg: "users working" }));

//create register user route
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      //generate salt to protect against attacks
      bcrypt.genSalt(10, (err, salt) => {
        //hash password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          //assign hashed password
          newUser.password = hash;

          //save object new state
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//create login user route
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }

    //check password
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        //user match

        //create jwt payload
        const payload = {
          id: user.id,
          name: user.name
        };

        //create signed token
        jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });

        //res.json({ message: "Success logged in" });
      } else {
        return res.status(400).json({ password: "Incorrect password entered" });
      }
    });
  });
});

//return authenticated current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //current user info
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
