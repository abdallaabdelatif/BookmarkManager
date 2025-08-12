const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./Routes/users.route");
const bookmarkRoutes = require("./Routes/bookmarks.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/bookmarks", bookmarkRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to the DB Successfully."))
  .catch((error) => console.log("Connection Failed.",error));

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server started listening on port: => ${port}`);
});
console.log("JWT_SECRET:", process.env.JWT_SECRET);
