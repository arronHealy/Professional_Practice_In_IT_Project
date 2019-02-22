const express = require("express");

const router = express.Router();

//use model for user
const User = require("../models/User");

router.get("/test", (req, res) => res.json({ msg: "users working" }));

module.exports = router;
