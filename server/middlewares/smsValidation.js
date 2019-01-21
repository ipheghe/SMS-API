import { Sms, Contact } from '../models';
import { handleErrorMessage } from '../utils/messageHandler';

/**
 * @description middleware function to validate sms fields
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateSmsFields = (req, res, next) => {
  // check if recipe name field is empty
  if (!req.body.message || req.body.message === '') {
    return handleErrorMessage(res, 400, 'message field cannot be empty');
  }

  return next();
};

/**
 * @description middleware function to check if sms exists
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isSmsExisiting = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.smsId, 10))) {
    return handleErrorMessage(res, 400, 'Please provide a valid ID');
  }
  Sms
    .find({ where: { id: req.params.smsId } })
    .then((sms) => {
      if (!sms) {
        return handleErrorMessage(res, 404, 'Sms does not exist');
      }
      next();
    })
    .catch(error => handleErrorMessage(res, 500, error));
};

export const isContactSms = (req, res, next) => {
  Sms
    .find({ where: {
      id: req.params.smsId,
      senderId: req.decoded.contact.id,
    },
  })
    .then((sms) => {
      if (!sms) {
        return handleErrorMessage(res, 401, 'Access Denied!');
      }
      next();
    })
    .catch(error => handleErrorMessage(res, 500, error));
};

/**
 * @description middleware function to check if sender exists
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isSenderValid = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.senderId || req.decoded.contact.id, 10))) {
    return handleErrorMessage(res, 400, 'Please provide a valid ID');
  }
  Contact.findById(req.params.senderId || req.decoded.contact.id)
    .then((contact) => {
      if (!contact) {
        return handleErrorMessage(res, 404, 'Sender\'s account not available!');
      }
      next();
    });
};

/**
 * @description middleware function to check if receiver exists
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isReceiverValid = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.receiverId || req.decoded.contact.id, 10))) {
    return handleErrorMessage(res, 400, 'Please provide a valid ID');
  }
  Contact.findById(req.params.receiverId || req.decoded.contact.id)
    .then((contact) => {
      if (!contact) {
        return handleErrorMessage(res, 404, 'Receiver\'s account not available!');
      }
      next();
    });
};
