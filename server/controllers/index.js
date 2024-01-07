const NoteModel = require("../models/Notes");

const getNotes = async (req, res) => {
  try {
    const Notes = await NoteModel.find();
    res
      .status(200)
      .json({ message: "notes retrieved successfully!", data: Notes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const id = req.params.id;
    const Note = await NoteModel.findById(id);
    res
      .status(200)
      .json({ message: "note retrieved successfully!", data: Note });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const newNote = new NoteModel({
      title: req.body.title,
      content: req.body.content,
    });
    const savedNote = await newNote.save()
    res.status(200).json({ message: "note created successfully!", data: savedNote });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
      const id = req.params.id;
      const updatedNote = req.body
      const Note = await NoteModel.findByIdAndUpdate(id, updatedNote, {new: true});

    res
      .status(200)
      .json({ message: "note updated successfully!", data: updatedNote });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const Note = await NoteModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "note deleted successfully!"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getNotes, getNote, createNote, updateNote, deleteNote };
