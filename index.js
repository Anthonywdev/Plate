const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://AnthonyEnn:@nthonYs1@react.gwqhs.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
