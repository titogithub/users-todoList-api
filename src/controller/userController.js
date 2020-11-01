const userModel = require('../models/users');
const httpResponseHandler = require('../service/httpResponseHandler');
const httpResponse = require('../service/httpResponseHandler');

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
};
