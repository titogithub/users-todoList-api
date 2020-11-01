const cryptoHandler = require('../service/cryptoHandler');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const users = new Schema(
  {
    id: {
      type: Number,
      required: false,
      private: false,
    },
    firstName: {
      type: String,
      required: true,
      private: false,
    },
    lastName: {
      type: String,
      required: true,
      private: false,
    },
    description: {
      type: String,
      private: false,
      maxlength: 165,
    },
    age: {
      type: Number,
      private: false,
    },
    nickName: {
      type: String,
      required: false,
      private: false,
    },
    email: {
      type: String,
      required: true,
      private: false,
    },
    password: {
      type: String,
      required: true,
      private: true,
    },
    profilePhoto: {
      type: String,
      required: false,
      private: false,
    },
    location: {
      type: String,
      required: false,
      private: false,
    },
    country: {
      type: String,
      required: false,
      private: false,
    },
    primaryPhone: {
      type: String,
      required: false,
      private: false,
    },
    secondaryPhone: {
      type: String,
      required: false,
      private: false,
    },
    bio: {
      type: String,
      required: false,
      private: false,
    },
    gender: {
      type: String,
      required: false,
      private: false,
    },
    birthdate: {
      type: Date,
      required: false,
      private: false,
    },
    status: {
      type: String,
      required: false,
      default: 'active',
      private: false,
    },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now,
      private: true,
    },
    modifiedAt: {
      type: Date,
      required: false,
      default: Date.now,
      private: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
      private: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

// hash user password before saving into database
users.pre('save', function (next) {
  this.password = cryptoHandler.encrypt(this.password);
  next();
});

users.options.toJSON = {
  transform(user) {
    delete user.password;
  },
};

module.exports = mongoose.model('users', users);
