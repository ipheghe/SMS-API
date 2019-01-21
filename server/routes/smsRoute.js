import express from 'express';
import { SmsController } from '../controllers';
import {
  validateSmsFields,
  isSmsExisiting,
  isSenderValid,
  isReceiverValid,
  isContactSms,
} from '../middlewares/smsValidation';
import verifyUser from '../middlewares/requireAuth';

const smsRoute = express.Router();

// API route for users to create SMS
smsRoute.post(
  '/api/v1/sms/contact/:receiverId',
  verifyUser,
  isSenderValid,
  isReceiverValid,
  validateSmsFields,
  SmsController.createSms,
);

// API route for users to get all SMS
smsRoute.get('/api/v1/sms', verifyUser, SmsController.getAllSmsMessages);

// API route for users to get all sent SMS
smsRoute.get(
  '/api/v1/sms/sent',
  verifyUser,
  isSenderValid,
  SmsController.getAllMessagesSentByAContact
);

// API route for users to get all received SMS
smsRoute.get(
  '/api/v1/sms/received',
  verifyUser,
  isReceiverValid,
  SmsController.getAllMessagesReceivedByAContact
);

// API route for users to read SMS
smsRoute.get(
  '/api/v1/sms/received/:smsId',
  verifyUser,
  isSmsExisiting,
  isReceiverValid,
  SmsController.readMessage
);

// API route for users to delete SMS
smsRoute.delete(
  '/api/v1/sms/:smsId',
  verifyUser,
  isSmsExisiting,
  isContactSms,
  SmsController.deleteSms
);

export default smsRoute;
