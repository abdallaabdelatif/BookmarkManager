const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/users.route");

const app = express();

// Built-in middlewares
app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/users", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the DB Successfully."))
  .catch((error) => console.log("Connection Failed."));

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server started listening on port: => ${port}`);
});
