const { Router } = require('express');
const userRouter = require('./user.router');
const noteRouter = require('./note.router');

const mainRouter = Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/note', noteRouter);

module.exports = mainRouter;
