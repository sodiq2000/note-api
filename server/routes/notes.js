const express = require('express');
const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/')

const router = express.Router();

router.get("/", express.json({ message: "service is up!" }));
router.get('/notes/all', getNotes);
router.get('/notes/:id', getNote)
router.post('/notes/create', createNote);
router.patch('/notes/:id', updateNote)
router.delete('/notes/:id', deleteNote)

module.exports = router;
