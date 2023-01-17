const yup = require('yup');

let registerSchema = yup.object({
  body: yup.object({
    firstName: yup.string().required('FirstName is required'),
    lastName: yup.string(),
    email: yup
      .string()
      .email('Email form is not correct')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
});

let loginSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Email form is not correct')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
});

module.exports = { registerSchema, loginSchema };
