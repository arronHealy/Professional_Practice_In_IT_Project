const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");

//initial test route
router.get("/test", (req, res) => res.json({ msg: "profile route working" }));

module.exports = router;
