const { Router } = require('express');
const {
  createNote,
  isCompleted,
  deleteNoteById,
  getNoteById,
  updateNoteById,
  getAllNotesByUser,
} = require('../controllers/notes');
const {
  getAccessToRoute,
  isUserAvailable,
} = require('../middlewares/auth/index');
const {
  createSchema,
  isCompletedSchema,
  getNoteByIdSchema,
  deleteNoteByIdSchema,
  updateNoteByIdSchema,
} = require('../middlewares/yup/note.yup');
const validate = require('../middlewares/yup/validate');

const noteRouter = Router();

noteRouter.post(
  '/create',
  [getAccessToRoute, validate(createSchema)],
  createNote
);
noteRouter.patch(
  '/isCompleted/:id',
  [getAccessToRoute, validate(isCompletedSchema)],
  isCompleted
);
noteRouter.get(
  '/getNoteById/:id',
  [getAccessToRoute, validate(getNoteByIdSchema)],
  getNoteById
);
noteRouter.get(
  '/getAllNotesByUser',
  [getAccessToRoute, isUserAvailable],
  getAllNotesByUser
);
noteRouter.put(
  '/update/:id',
  [getAccessToRoute, validate(updateNoteByIdSchema)],
  updateNoteById
);
noteRouter.delete(
  '/deleteNoteById/:id',
  [getAccessToRoute, validate(deleteNoteByIdSchema)],
  deleteNoteById
);

module.exports = noteRouter;
