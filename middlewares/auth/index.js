const expressAsyncHandler = require('express-async-handler');
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require('../../helpers/auth/token.helper');
const CustomError = require('../../helpers/errors/CustomError');
const jwt = require('jsonwebtoken');
const User = require('../../databases/models/User.model');

// Get access to route
const getAccessToRoute = (req, res, next) => {
  const { JSON_SECRET_KEY } = process.env;

  if (!isTokenIncluded(req)) {
    return next(
      new CustomError('You are not authorized to access this route', 401)
    );
  }

  const accessToken = getAccessTokenFromHeader(req);
  jwt.verify(accessToken, JSON_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError('You are not authorized to access this route', 401)
      );
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  });
};

const isUserAvailable = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError('This user is not available', 404));
  }

  next();
});

module.exports = { getAccessToRoute, isUserAvailable };
