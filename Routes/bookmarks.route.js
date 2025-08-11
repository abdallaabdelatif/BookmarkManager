const express = require("express");
const router = express.Router();

const {
  createBookmark,
  editBookmark,
  deleteBookmark,
  getBookmarks,
} = require("../Controllers/bookmarks.controller");
const { auth } = require("../Middlewares/auth.middleware");
router.get("/", getBookmarks);
router.post("/", auth, createBookmark);
router.patch("/:id", auth, editBookmark);
router.delete("/:id", auth, deleteBookmark);
module.exports = router;
