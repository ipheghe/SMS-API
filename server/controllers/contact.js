import jwt from 'jsonwebtoken';
import {
  Contact,
  Sms,
} from '../models';
import {
  handleErrorMessage,
  handleSuccessMessage,
  handleAuthenticationMessage,
} from '../utils/messageHandler';

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
   * @return {object} status message data
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
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description controller function that handles login of contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} message token
   */
  static signinContact(req, res) {
    const {
      name,
      phoneNumber,
    } = req.body;

    Contact.findOne({
      where: {
        name,
        phoneNumber,
      },
    })
      .then((contact) => {
        if (!contact) {
          return handleErrorMessage(res, 401, 'Authentication failed.');
        } else if (contact) {
          const contactdata = {
            id: contact.id,
            name: contact.name,
          };
          const token = jwt.sign({
            contact: contactdata,
          }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY_TIME,
          });

          return handleAuthenticationMessage(res, 200, token, 'Authentication & Login successful');
        }
      })
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Get all contacts
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getAllContacts(req, res) {
    return Contact.findAll({
      include: [
        {
          model: Sms,
          as: 'sentMessages',
          attributes: ['message', 'createdAt'],
          include: [
            {
              model: Contact,
              as: 'receiver',
              attributes: ['name', 'phoneNumber'],
            },
          ],
        },
        {
          model: Sms,
          as: 'receivedMessages',
          attributes: ['message', 'createdAt'],
          include: [
            {
              model: Contact,
              as: 'sender',
              attributes: ['name', 'phoneNumber'],
            },
          ],
        },
      ],
    })
      .then(contacts => handleSuccessMessage(res, 200, contacts, 'All contacs retrieved successfully.'))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        handleErrorMessage(res, 400, errorMessage);
      })
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Get a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getContact(req, res) {
    return Contact
      .findById(req.params.contactId, {
        include: [
          {
            model: Sms,
            as: 'sentMessages',
            attributes: ['message', 'createdAt'],
          },
          {
            model: Sms,
            as: 'receivedMessages',
            attributes: ['message', 'createdAt'],
          },
        ],
      })
      .then((contact) => handleSuccessMessage(res, 200, contact, 'Contact retrieved successfully.'))
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Update a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static updateContact(req, res) {
    const {
      name,
      phoneNumber,
    } = req.body;

    Contact.find({ where: { id: req.decoded.contact.id } })
      .then((contact) => {
        if (name || phoneNumber) {
          return contact.update({
            name: name ? name.trim() : contact.name,
            phoneNumber: phoneNumber ? phoneNumber.trim() : contact.phoneNumber,
          })
          .then((updatedContact) => handleSuccessMessage(res, 200, updatedContact, 'Contact updated successfully.'))
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            handleErrorMessage(res, 400, errorMessage);
          })
          .catch((err) => handleErrorMessage(res, 500, err));
        }
        handleErrorMessage(res, 400, 'Please select a field to update');
      })
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Delete a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static deleteContact(req, res) {
    return Contact.destroy({ where: { id: req.decoded.contact.id } })
    .then(() => handleSuccessMessage(res, 200, null, 'Contact deleted successfully.'))
    .catch(err => handleErrorMessage(res, 500, err));
  }
}
