// Generate cookie to user
const sendJwtToClient = (user, res, isRegister) => {
  const token = user.generateJwtFromUser();
  const { NODE_ENV, JWT_COOKIE } = process.env;

  return res
    .status(isRegister === 'register' ? 201 : 200)
    .cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV === 'development' ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      user: {
        firstName: user.firstName,
      },
    });
};

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  );
};

// Get access token from header
const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(' ')[1];
  return access_token;
};

module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };
