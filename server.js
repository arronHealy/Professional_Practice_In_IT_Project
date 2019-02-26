const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const keys = require("./configuration/SecurityKeys");

const users = require("./routes/users");

const passport = require("passport");

const app = express();

app.get("/", (req, res) => res.send("Test route for backend"));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require database
const db = keys.mongoConnect;

//connect to db
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const port = 5000;

//passport middleware
app.use(passport.initialize());

//passport config file
require("./configuration/passport")(passport);

app.use("/api/users", users);

app.listen(port, () => console.log("app running on port " + port));
