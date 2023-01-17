const bcrypt = require('bcryptjs');

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  comparePassword,
};
