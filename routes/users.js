const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

//use model for user
const User = require("../models/User");

//test route
router.get("/test", (req, res) => res.json({ msg: "users working" }));

//create register user route
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          newUser.password = hash;

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

        //sign token
        jwt.sign(payload, "secretKey", { expiresIn: 7200 }, (err, token) => {
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

module.exports = router;
