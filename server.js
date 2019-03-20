const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
// const routes = require("./routes");
// const db = require("./models");
// const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3002;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-type,application/json"
  );
  next();
});

dotenv.config({ path: ".env" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/chatIGN", {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
