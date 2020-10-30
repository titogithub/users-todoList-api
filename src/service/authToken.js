const jwt = require('jsonwebtoken');
const { createToken } = require('./JWTHandler');

const requireAuthentication = (request) => {
  const route = `${request.method} ${request.baseUrl}${request._parsedUrl.pathname}`;
  //add routes to be interceptable
  const authenticationList = ['GET /api/users/getUsersProfiles'];

  return authenticationList.find((element) => route.includes(element));
};

const refreshToken = (token, res) => {
  const tokenLimit = process.env.TOKEN_REFRESH;
  const todayDate = parseInt((new Date().getTime() / 1000).toFixed(0));
  const expDate = token.exp;
  const diff = expDate - todayDate;
  if (diff <= tokenLimit) {
    const { token: newToken } = createToken(token.user);
    res.header('Authorization', `Bearer ${newToken}`);
  }
};

const isAuth = async (req, res, next) => {
  if (!requireAuthentication(req)) {
    next();
    return;
  }

  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const tokenVerified = await jwt.verify(token, process.env.TOKEN_KEY);
    res.locals.userId = tokenVerified.user._id;
    refreshToken(tokenVerified, res);
    next();
  } catch (error) {
    console.log('token error: ', error);
    return res.status(403).send({ message: 'Unauthorized' });
  }
};

module.exports = isAuth;
