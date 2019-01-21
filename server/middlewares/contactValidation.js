import { Contact } from '../models';
import { handleErrorMessage } from '../utils/messageHandler';

/**
 * @description middleware function to validate contact fields
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateContactFields = (req, res, next) => {
  const numericExpression = /^[0-9]+$/;

  // check if name field is empty
  if (!req.body.name || req.body.name.trim() === '') {
    return handleErrorMessage(res, 400, 'name field cannot be empty');
  }
  // check if phone  number field is empty
  if (!req.body.phoneNumber || req.body.phoneNumber === '') {
    return handleErrorMessage(res, 400, 'phone number field cannot be empty');
  }
  
  // check if name field contains more than 2 characters
  if (req.body.name.length < 3) {
    return handleErrorMessage(res, 400, 'name must have more than 2 characters');
  }

  // check if phone number field contains only numbers
  if (!req.body.phoneNumber.match(numericExpression)) {
    return handleErrorMessage(res, 400, 'phone number must contain only numbers');
  }

  return next();
};

/**
 * @description middleware function to check if user contact exists
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isContactValid = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.contactId || req.decoded.contact.id, 10))) {
    return handleErrorMessage(res, 400, 'Please enter a valid ID');
  }
  Contact.findById(req.params.contactId || req.decoded.contact.id)
    .then((contact) => {
      if (!contact) {
        return handleErrorMessage(res, 404, 'Contact account not available!');
      }
      next();
    });
};
