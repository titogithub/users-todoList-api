var path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  routes = require('../router/userRouter');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  routes(app);
  app.use((err, req, res, next) => {
    console.error(err.stack);
  });
  return app;
};
