const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const NoteModel = mongoose.model('notes', NoteSchema);
module.exports = NoteModel;
