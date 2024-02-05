require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

const User = require("./models/user");
const user_routes = require("./routes/user-routes");
const polls_routes = require("./routes/poll-route");

const port = process.env.PORT;

mongoose
  .connect("mongodb://127.0.0.1:27017/quick-poll")
  .then(() => {
    console.log("Connected to MongoDB database server");
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello Node");
});

app.use("/users", user_routes);
app.use("/", polls_routes);
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Unknown Path
app.use((req, res) => {
  res.status(404).json({ error: "Path Not Found" });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
