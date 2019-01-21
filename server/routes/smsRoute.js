import express from 'express';
import { SmsController } from '../controllers';
import {
  validateSmsFields,
  isSenderValid,
  isReceiverValid,
} from '../middlewares/smsValidation';

const smsRoute = express.Router();

// API route for users to create accounts
smsRoute.post(
  '/api/v1/sms/:senderId/:receiverId',
  isSenderValid,
  isReceiverValid,
  validateSmsFields,
  SmsController.createSms,
);

export default smsRoute;
