import express from 'express';
import { SmsController } from '../controllers';
import {
  validateSmsFields,
  isSenderValid,
  isReceiverValid,
} from '../middlewares/smsValidation';

const smsRoute = express.Router();

// API route for users to create SMS
smsRoute.post(
  '/api/v1/sms/:senderId/:receiverId',
  isSenderValid,
  isReceiverValid,
  validateSmsFields,
  SmsController.createSms,
);

// API route for users to get all SMS
smsRoute.get('/api/v1/sms', SmsController.getAllSmsMessages);

// API route for users to get all sent SMS
smsRoute.get(
  '/api/v1/sms/sent/:senderId',
  isSenderValid,
  SmsController.getAllMessagesSentByAContact
);

// API route for users to get all received SMS
smsRoute.get(
  '/api/v1/sms/received/:receiverId',
  isReceiverValid,
  SmsController.getAllMessagesReceivedByAContact
);

export default smsRoute;
