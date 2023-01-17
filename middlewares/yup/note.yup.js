const yup = require('yup');

let createSchema = yup.object({
  body: yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    isCompleted: yup.bool(),
  }),
});

let isCompletedSchema = yup.object({
  params: yup.object({
    id: yup.string().required('Note id is required'),
  }),
});

let getNoteByIdSchema = yup.object({
  params: yup.object({
    id: yup.string().required('Note id is required'),
  }),
});

let updateNoteByIdSchema = yup.object({
  body: yup.object({
    title: yup.string(),
    content: yup.string(),
    isCompleted: yup.bool(),
  }),
  params: yup.object({
    id: yup.string().required('Note id is required'),
  }),
});

let deleteNoteByIdSchema = yup.object({
  body: yup.object({
    title: yup.string(),
    content: yup.string(),
  }),
  params: yup.object({
    id: yup.string().required('Note id is required'),
  }),
});

module.exports = {
  createSchema,
  isCompletedSchema,
  getNoteByIdSchema,
  updateNoteByIdSchema,
  deleteNoteByIdSchema,
};
