const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Note = require('./Note.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a first name'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter a email address'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be a minimum of 6 characters'],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Generate Json Web Token From User
UserSchema.methods.generateJwtFromUser = function () {
  const { JSON_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    email: this.email,
  };

  const token = jwt.sign(payload, JSON_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });
  return token;
};

// Password hashing
UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) next(err);
      this.password = hash;
      next();
    });
  });
});

// Delete notes when user deleted
UserSchema.pre('remove', async function (next) {
  await Note.deleteMany({
    userId: this._id,
  });
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
