const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  description: {
    type: String,
    maxLength: 100,
    requied: false,
  },
  url: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: false,
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  folderId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Folder",
    required: false,
    default: null,
  },
});
const bookmarkModel = mongoose.model("Bookmark", bookmarkSchema);
module.exports = bookmarkModel;
