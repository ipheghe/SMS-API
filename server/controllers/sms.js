import { Sms } from '../models';
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
   * @return {object} response data object
   */
  static createSms(req, res) {
    const { message } = req.body;

    Sms.create({
      message,
      senderId: req.params.senderId,
      receiverId: req.params.receiverId,
    })
      .then(message => handleSuccessMessage(res, 201, message, 'Text message has been successfully sent'))
      .catch((error) => {
        const errorMessage = error.errors.map(value => value.message);
        return handleErrorMessage(res, 400, errorMessage);
      })
    .catch(err => handleErrorMessage(res, 500, err));
  }
}
