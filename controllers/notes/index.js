const expressAsyncHandler = require('express-async-handler');
const Note = require('../../databases/models/Note.model');
const CustomError = require('../../helpers/errors/CustomError');
const User = require('../../databases/models/User.model');

// Create Note
const createNote = expressAsyncHandler(async (req, res, next) => {
  const { title, content, isCompleted } = req.body;
  const { id } = req.user;

  await Note.create({
    title,
    content,
    isCompleted,
    userId: id,
  });

  res.status(201).json({
    success: true,
    message: 'Note successfully created',
  });
});

// is Completed
const isCompleted = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return next(new CustomError('There are not any note with this id', 404));
  }

  note.isCompleted = !note.isCompleted;
  await note.save();

  res.status(200).json({
    success: true,
    message: 'Note successfully updated',
  });
});

// Get Note By Id
const getNoteById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return next(new CustomError('This note is not available', 404));
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// Update Note By Id
const updateNoteById = expressAsyncHandler(async (req, res, next) => {
  const { title, content, isCompleted } = req.body;
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return next(new CustomError('This note is not available', 404));
  }

  if (title) {
    note.title = await title;
  }

  if (content) {
    note.content = await content;
  }

  if (isCompleted) {
    note.isCompleted = await isCompleted;
  }

  await note.save();

  res.status(200).json({
    success: true,
    message: 'Note successfully updated',
  });
});

// Delete Note By Id
const deleteNoteById = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    return next(new CustomError('This note is not available', 404));
  }

  await note.delete();

  res.status(200).json({
    success: true,
    message: 'Note successfully deleted',
  });
});

// Get all notes by user
const getAllNotesByUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const notes = await Note.find({ userId: id });

  return res.status(200).json({
    success: true,
    notes,
  });
});

module.exports = {
  createNote,
  isCompleted,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  getAllNotesByUser,
};
