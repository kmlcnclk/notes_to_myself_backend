const { Router } = require('express');
const { login, register, logout, profile } = require('../controllers/users');
const { registerSchema, loginSchema } = require('../middlewares/yup/user.yup');
const validate = require('../middlewares/yup/validate');
const { getAccessToRoute } = require('../middlewares/auth');

const userRouter = Router();

userRouter.post('/register', validate(registerSchema), register);
userRouter.post('/login', validate(loginSchema), login);
userRouter.get('/logout', [getAccessToRoute], logout);
userRouter.get('/profile', [getAccessToRoute], profile);

module.exports = userRouter;
