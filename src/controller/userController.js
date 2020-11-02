const userModel = require('../models/users');
const cryptoHandler = require('../service/cryptoHandler');
const httpResponseHandler = require('../service/httpResponseHandler');
const httpResponse = require('../service/httpResponseHandler');
const JWTHandler = require('../service/JWTHandler');

module.exports = {
  get: (req, res, next) => {
    try {
      userModel
        .find({})
        .select('-password')
        .exec((err, users) => {
          if (err) {
            return httpResponse.sendInternalError(res, 'Internal server error');
          }
          return httpResponseHandler.sendSuccess(res, users);
        });
    } catch (error) {
      next(error);
    }
  },
  post: (req, res, next) => {
    try {
      userModel.findOne(
        { email: req.body.email.toLowerCase() },
        (err, user) => {
          if (err) {
            return httpResponse.sendInternalError(res, 'Internal server error');
          }
          if (user) {
            return httpResponse.sendInternalError(
              res,
              'This email address was used before'
            );
          }

          const userDB = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nickName: req.body.nickName,
            age: req.body.age,
            email: req.body.email,
            password: req.body.password,
          });

          userDB.save((err) => {
            if (err) {
              return httpResponse.sendInternalError(
                res,
                'Internal server error'
              );
            }
            return httpResponse.sendEmpty(res);
          });
        }
      );
    } catch (error) {
      next(error);
    }
  },
  login: (req, res, next) => {
    try {
      userModel.findOne(
        { email: req.body.email.toLowerCase() },
        (err, user) => {
          if (err) {
            return httpResponse.sendInternalError(res, 'Internal server error');
          }
          if (!user) {
            return httpResponse.sendNotFoundReq(
              res,
              'Opps! User not found',
              409
            );
          }
          if (cryptoHandler.decrypt(user.password) === req.body.password) {
            const userData = {
              _id: user._id,
              email: user.email,
              nickName: user.nickName,
            };
            const token = JWTHandler.createToken(userData);
            return httpResponseHandler.sendSuccess(res, { userData, token });
          }
          return httpResponseHandler.sendForbidden(res);
        }
      );
    } catch (error) {
      next(error);
    }
  },
};
