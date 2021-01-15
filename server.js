const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const matches = require("./routes/api/matches");

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

//db config
const db = require("./config/keys").mongoURI;

//cors
app.use(cors());

//connect to mongoose
mongoose
 .connect(db, { useNewUrlParser: true })
 .then(() => console.log("MongoDB connected"))
 .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

app.use("/images", express.static(path.join(__dirname + "/images")));

//Passport config
require("./config/passport")(passport);

//Use route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/matches", matches);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.enable("trust proxy");

  //Set static folder
  app.use(express.static(path.join(__dirname, "/../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
  });
}