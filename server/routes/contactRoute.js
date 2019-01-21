import express from 'express';
import { ContactController } from '../controllers';
import {
  validateContactFields,
  isContactValid,
} from '../middlewares/contactValidation';

const contactRoute = express.Router();

// API route to create contact
contactRoute
  .post('/api/v1/contact', validateContactFields, ContactController.createContact);

// API route to get all contacts
contactRoute.get('/api/v1/contact', ContactController.getAllContacts);

// API route to get a contact
contactRoute.get('/api/v1/contact/:contactId', isContactValid, ContactController.getContact);

// API route to update contact
contactRoute.put('/api/v1/contact/:contactId', isContactValid, ContactController.updateContact);

// API route to delete contact
contactRoute.delete('/api/v1/contact/:contactId', isContactValid, ContactController.deleteContact);

export default contactRoute;
