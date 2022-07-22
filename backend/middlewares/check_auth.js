const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');


/**
 * JWT token authentication
 * req must have in header:  Authorization: 'Bearer TOKEN'
 * TOKEN will be sent by server and sent back by client
 */
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    
    //this adds userData field with userID from token, we will also probably follow this
    // req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
