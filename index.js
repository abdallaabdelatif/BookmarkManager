const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Built-in middlewares
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/BookmarkManager")
  .then(() => console.log("Connected to the DB Successfully."))
  .catch((error) => console.log("Connection Failed."));

const port = 3333;
app.listen(port, () => {
  console.log(`Server started listening on port: => ${port}`);
});
