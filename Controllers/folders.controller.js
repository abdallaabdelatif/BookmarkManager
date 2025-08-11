const folderModel = require("../Models/folders.model");
const Bookmark = require("../Models/bookmarks.model");
const mongoose = require("mongoose"); 

exports.GetAll = async (req, res) => {
  try {
    const AllFolders = await folderModel.find()
      .populate("userId", "username")
      .populate("bookmarks", "title");
    if (AllFolders.length === 0) { 
      return res.status(404).json({ message: "No folders found!" });
    }
    res.status(200).json({ message: "success", data: AllFolders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.GetById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) { 
    return res.status(400).json({ error: "Invalid folder ID." });
  }
  try {
    const Folder = await folderModel.findById(id)
      .populate("userId", "username -__v")
      .populate("bookmarks", "title -__v");
    if (!Folder) {
      return res.status(404).json({ message: "Folder not found." });
    }
    res.status(200).json({ message: "success", data: Folder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.GetFolderBookmarks = async (req, res) => {
  const { folderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(folderId)) { 
    return res.status(400).json({ error: "Invalid folder ID." });
  }
  try {
    const bookmarks = await Bookmark.find({ folderId })
      .populate("userId", "username -__v");
    if (bookmarks.length === 0) {
      return res.status(404).json({ message: "No bookmarks found in this folder." });
    }
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.CreateNewFolder = async (req, res) => {
  const { name, userId } = req.body;
 
  if (!name || name.length < 3 || name.length > 15) {
    return res.status(400).json({ error: "Folder name must be 3-15 characters." });
  }
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }
  try {
    const NewFolder = await folderModel.create({ name, userId });
    res.status(201).json({ message: "Folder created successfully", data: NewFolder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.UpdateFolder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid folder ID." });
  }
  try {
    const updatedFolder = await folderModel
      .findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .populate("userId", "username -__v")
      .populate("bookmarks", "title -__v");
    if (!updatedFolder) {
      return res.status(404).json({ error: "Folder not found." });
    }
    res.status(200).json({ message: "Folder updated successfully", data: updatedFolder });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(folderId)) { 
    return res.status(400).json({ error: "Invalid folder ID." });
  }
  try {
    await Bookmark.updateMany({ folderId }, { $set: { folderId: null } });
    const folder = await folderModel.findByIdAndDelete(folderId);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found." });
    }
    res.status(200).json({ message: "Folder deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};