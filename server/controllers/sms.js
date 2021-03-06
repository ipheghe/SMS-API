import {
  Sms,
  Contact,
} from '../models';
import {
  handleErrorMessage,
  handleSuccessMessage,
} from '../utils/messageHandler';

/**
 * @description Sms controller that houses different methods
 *
 * @return {void} null
 */
export default class SmsController {
  /**
   * @description controller function that handles creation of new sms
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static createSms(req, res) {
    const { message } = req.body;

    Sms.create({
      message,
      senderId: req.decoded.contact.id,
      receiverId: req.params.receiverId,
    })
      .then(message => handleSuccessMessage(res, 201, message, 'Text message has been successfully sent'))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return handleErrorMessage(res, 400, errorMessage);
      })
    .catch(err => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Get all SMS
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getAllSmsMessages(req, res) {
    return Sms.findAll({
      include: [
        {
          model: Contact,
          as: 'sender',
          attributes: ['name', 'phoneNumber'],
        },
        {
          model: Contact,
          as: 'receiver',
          attributes: ['name', 'phoneNumber'],
        },
      ],
    })
      .then((messages) => handleSuccessMessage(res, 200, messages, 'All text messages retrieved successfully.'))
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Get all messages sent by a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getAllMessagesSentByAContact(req, res) {
    Sms.findAll({
      where: {
        senderId: req.decoded.contact.id,
      },
      include: [
        {
          model: Contact,
          as: 'receiver',
          attributes: ['name', 'phoneNumber'],
        },
      ],
    })
    .then((messages) => {
      if (messages.length < 1) {
        return handleErrorMessage(res, 404, 'Contact has no message history');
      }
      handleSuccessMessage(res, 200, messages, 'All contact\'s sent text messages retrieved successfully.');
    })
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Get all messages received by a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static getAllMessagesReceivedByAContact(req, res) {
    Sms.findAll({
      where: {
        receiverId: req.decoded.contact.id,
      },
      include: [
        {
          model: Contact,
          as: 'sender',
          attributes: ['name', 'phoneNumber'],
        },
      ],
    })
    .then((messages) => {
      if (messages.length < 1) {
        return handleErrorMessage(res, 404, 'Contact has no message history');
      }
      handleSuccessMessage(res, 200, messages, 'All contact\'s received text messages retrieved successfully.');
    })
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Read message
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static readMessage(req, res) {
    Sms.findOne({
      where: {
        id: req.params.smsId,
        receiverId: req.decoded.contact.id,
      },
      include: [
        {
          model: Contact,
          as: 'sender',
          attributes: ['name', 'phoneNumber'],
        },
      ],
    })
    .then((message) => {
      if (!message) {
        return handleErrorMessage(res, 404, 'Contact has no message history');
      } else {
        if (message.smsStatus === 'UNREAD') {
          return message.update({ smsStatus: 'READ' })
            .then((updatedMessage) => handleSuccessMessage(
              res,
              200,
              updatedMessage,
              'Text message viewed successfully.'))
              .catch(err => handleErrorMessage(res, 500, err));
        }
        handleSuccessMessage(res, 200, message,'Text message viewed successfully.');
      }
    })
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Delete message
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message data
   */
  static deleteSms(req, res) {
    Sms.destroy({ where: { id: req.params.smsId } })
    .then(() => handleSuccessMessage(res, 200, null, 'Text message deleted successfully.'))
    .catch(err => handleErrorMessage(res, 500, err));
  }
}
