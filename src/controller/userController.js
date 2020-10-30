module.exports = {
  get: (req, res, next) => {
    try {
      res.send({ status: 'ok' });
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      res.send({ status: 'ok' });
    } catch (error) {
      next(error);
    }
  },
};
