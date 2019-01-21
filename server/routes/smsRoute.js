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

export default smsRoute;
