var express = require('express'),
  router = express.Router(),
  userController = require('../controller/userController'),
  isAuth = require('../service/authToken');

module.exports = (app) => {
  // Check service health
  router.get('/', (req, res) => {
    res.json({
      state: 200,
      message: 'running',
    });
  });

  app.use(isAuth);
  router.route('/user').get(userController.get);
  router.route('/user').post(userController.post);

  app.use('/api/', router);
};
