const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
    },
    content: {
      type: String,
      required: [true, 'Please enter a content'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
