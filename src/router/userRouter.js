var express = require('express'),
  router = express.Router(),
  userController = require('../controller/userController');

module.exports = (app) => {
  // Check service health
  router.get('/', (req, res) => {
    res.json({
      state: 200,
      message: 'running',
    });
  });

  router.route('/user').get(userController.get);
  router.route('/user').post(userController.post);

  app.use('/api/', router);
};
