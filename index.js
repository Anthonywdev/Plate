const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");

// folde to add to .gitignore to save sensitive files and keys
const config = require("./config/key");

//connecting to mongo db
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//creating expres app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

//api routing to get users information
app.post("/api/users/register", (req, res) => {
  // creating a new user
  const user = new User(req.body);

  // saving users information to mongodb
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

// root connection of application
app.get("/", (req, res) => {
  res.json("hello darkness my old friend");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
