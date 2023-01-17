const expressAsyncHandler = require('express-async-handler');
const User = require('../../databases/models/User.model');
const { comparePassword } = require('../../helpers/auth/password.helper');
const { sendJwtToClient } = require('../../helpers/auth/token.helper');
const CustomError = require('../../helpers/errors/CustomError');

// Register
const register = expressAsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    sendJwtToClient(user, res, 'register');
  } catch (err) {
    return next(new CustomError('This email has already taken', 400));
  }
});

// Login
const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new CustomError('This user is not available'), 404);
  }

  if (!comparePassword(password, user.password)) {
    return next(new CustomError('Your password is not correct', 400));
  }

  sendJwtToClient(user, res, 'login');
});

// Logout
const logout = expressAsyncHandler((req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .clearCookie('access_token')
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === 'development' ? false : true,
    })
    .json({
      success: true,
      message: 'Logout Successful',
    });
});

// Profile
const profile = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError('This user is not available'), 400);
  }

  return res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  register,
  login,
  logout,
  profile,
};
