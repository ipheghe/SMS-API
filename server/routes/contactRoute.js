import express from 'express';
import ContactController from '../controllers';
import { validateContactFields } from '../middlewares/contactValidation';

const contactRoute = express.Router();

// API route to create contact
contactRoute
  .post('/api/v1/contact', validateContactFields, ContactController.createContact);

// API route to get all contacts
contactRoute.get('/api/v1/contact', ContactController.getAllContacts);

export default contactRoute;
