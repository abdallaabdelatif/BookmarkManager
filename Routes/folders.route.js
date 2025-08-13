const express = require("express");
const router = express.Router();

const {GetAll,
       GetById,
       GetFolderBookmarks,
       CreateNewFolder,
       UpdateFolder,
       deleteFolder
} = require("../Controllers//folders.controller");
const { auth } = require("../Middlewares/auth.middleware");
router.get("/", GetAll);
router.get("/:id",GetById)
router.get("/Bookmarks/:id",GetFolderBookmarks)
router.post("/", auth, CreateNewFolder);
router.patch("/:id", auth, UpdateFolder);
router.delete("/:id", auth, deleteFolder);
module.exports = router;
