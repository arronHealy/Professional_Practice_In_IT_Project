const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const keys = require("./configuration/SecurityKeys");

const users = require("./routes/users");
const profile = require("./routes/usersProfile");
const posts = require("./routes/usersPosts");

const passport = require("passport");

const path = require("path");

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

//use backend routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// make static folder for uploading images
app.use("/uploads", express.static("uploads"));
app.use("/profile/uploads", express.static("uploads"));

app.listen(port, () => console.log("app running on port " + port));
