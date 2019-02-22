const express = require("express");

const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => res.send("Test route for backend"));

const port = 5000;

app.listen(port, () => console.log("app running on port " + port));
