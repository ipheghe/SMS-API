import { Contact } from '../models';
import { handleErrorMessage, handleSuccessMessage } from '../utils/messageHandler';

/**
 * @description Contact controller that houses different methods
 *
 * @return {void} null
 */
export default class ContactController {
  /**
   * @description controller function that handles creation of new contact account
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} response object
   */
  static createContact(req, res) {
    const {
      name,
      phoneNumber,
    } = req.body;

    return Contact.findOne({
      where: { phoneNumber },
    }).then((existingContact) => {
      if (existingContact && existingContact.phoneNumber === phoneNumber) {
        return handleErrorMessage(res, 409, 'Phone number you entered already exist');
      }
      Contact.create({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
      })
        .then((contact) => {
          const contactData = {
            id: contact.id,
            name: contact.name,
            phoneNumber: contact.phoneNumber,
          };
          handleSuccessMessage(res, 201, contactData, 'Contact account successfully created.');
        })
        .catch((error) => {
          const errorMessage = error.errors.map(value => value.message);
          return handleErrorMessage(res, 400, errorMessage);
        });
    })
    .catch(err => handleErrorMessage(res, 500, err));
  }
}
