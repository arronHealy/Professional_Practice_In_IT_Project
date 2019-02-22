const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const users = require("./routes/users");

const app = express();

app.get("/", (req, res) => res.send("Test route for backend"));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//require database
const db =
  "mongodb://arronHealy:IrksDory15@ds137913.mlab.com:37913/learning-mongo-db";

//connect to db
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const port = 5000;

app.use("/api/users", users);

app.listen(port, () => console.log("app running on port " + port));
