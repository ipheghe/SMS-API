import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { handleErrorMessage } from '../utils/messageHandler';

dotenv.config();

/**
 * @description middleware function to verify token
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const verifyUser = (req, res, next) => {
  const token = req.headers['x-access-token']
  || req.headers.authorization
  || req.params.token;
  if (!token) {
    return handleErrorMessage(res, 400, 'No token provided!');
  } else if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return handleErrorMessage(res, 401, 'Invalid Token');
      }

      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        return handleErrorMessage(res, 401, 'Expired Token');
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return handleErrorMessage(res, 401, 'Authentication Unsuccessful!! Token not provided');
  }
};

export default verifyUser;
