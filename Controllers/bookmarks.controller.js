const bookmarkModel = require("../Models/bookmarks.model");
const { findByIdAndDelete } = require("../Models/users.model");

exports.createBookmark = async (req, res) => {
  let newBookmark = req.body;
  try {
    const bookmark = await bookmarkModel.create(newBookmark);
    res
      .status(201)
      .json({ message: "Bookmark created successfully", data: bookmark });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
};
exports.getBookmarks = async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const bookmarks = await bookmarkModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate("userId", "username");
    res.status(200).json({ data: bookmarks });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
};
exports.deleteBookmark = async (req, res) => {
  let { id } = req.params;
  try {
    let bookmark = await bookmarkModel.findByIdAndDelete(id);
    if (!bookmark) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.statu(400).json({ message: "Failed" });
  }
};
exports.editBookmark = async (req, res) => {
  let { id } = req.params;
  let newBookmark = req.body;
  try {
    const updatedBookmark = await bookmarkModel.findByIdAndUpdate(
      id,
      { $set: newBookmark },
      { new: true }
    );
    if (!updatedBookmark) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({
      message: "Bookmark updated successfully",
      data: updatedBookmark,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
};
