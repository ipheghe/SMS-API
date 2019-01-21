import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {
  contactRoute,
  smsRoute,
} from './server/routes';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route to view api-doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Require our routes into the application.
app.use(contactRoute);
app.use(smsRoute);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of SMS-API.',
}));

export default app;
