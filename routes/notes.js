const express = require("express");
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes");
const auth = require('../middleware/auth')

const router = express.Router();

router.get("/all", auth, getNotes);
router.get("/:id", auth, getNote);
router.post("/create", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;
