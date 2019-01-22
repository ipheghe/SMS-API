import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = ({ id, name }) => jwt.sign(
  { contact: { id, name } },
  process.env.TOKEN_SECRET, { expiresIn: 24 * 60 * 60 }
).toString();

export const invalidToken = jwt.sign(
  { contact: { id: 344, username: 'justin' } },
  'jsjsjjj', { expiresIn: '10s' }
).toString();

export const seedContacts = [
  {
    id: 101,
    name: 'Daniel',
    phoneNumber: 2348023456728,
  },
  {
    id: 102,
    name: 'Linda',
    phoneNumber: 2348023166724,
  },
  {
    id: 103,
    name: 'Mary',
    phoneNumber: 2347021166554,
  },
  {
    id: 104,
    name: 'Obama',
    phoneNumber: 2347033166554,
  },
];

export const unRegisteredContacts = [
  {
    id: 322,
    name: 'collins',
    phoneNumber: 23487873456728,
  },
  {
    id: 323,
    name: 'merlin',
    phoneNumber: 23480934567298,
  },
];

export const seedSms = [
  {
    id: 101,
    senderId: 101,
    receiverId: 102,
    message: 'Hello, Nice hanging out with you today',
  },
  {
    id: 102,
    senderId: 101,
    receiverId: 103,
    message: 'Are you home now?',
  },
  {
    id: 103,
    senderId: 102,
    receiverId: 103,
    message: 'The party was lit',
  },
  {
    id: 104,
    senderId: 103,
    receiverId: 102,
    message: 'How is your mum and dad?',
  },
  {
    id: 105,
    senderId: 102,
    receiverId: 104,
    message: 'What were your accomplishments as the President of USA?',
  },
];

export const tokens = [
  generateToken(seedContacts[0]),
  generateToken(seedContacts[1]),
  generateToken(seedContacts[2]),
  generateToken(unRegisteredContacts[0]),
  generateToken('stringToken'),
  generateToken(seedContacts[3]),
];
