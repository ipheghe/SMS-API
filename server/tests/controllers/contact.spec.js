import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

const server = supertest.agent(app);

const authToken1 = tokens[0];
const authToken2 = tokens[1];
const authToken3 = tokens[2];

describe('<<< Contact Controller: ', () => {
  describe('Create Contact: ', () => {
    it('should return message for successful account creation', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'funmi',
          phoneNumber: 2348023457734,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Contact account successfully created.');
          if (err) return done(err);
          done();
        });
    });

    it('should not create user with same phone number twice', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'ayo',
          phoneNumber: 2348023457734,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Phone number you entered already exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error for invalid phone number', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'ayo',
          phoneNumber: '2344666cssssddd',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('phone number must contain only numbers');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Signin Contact: ', () => {
    it('should return message for successful login', (done) => {
      server
        .post('/api/v1/contact/signin')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'funmi',
          phoneNumber: 2348023457734,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Authentication & Login successful');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error for invalid login authentication', (done) => {
      server
        .post('/api/v1/contact/signin')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'emekaa',
          phoneNumber: 2348023467734,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Authentication failed.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get All Contacts: ', () => {
    it('should return all contacts', (done) => {
      server
        .get('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All contacs retrieved successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get A Contact: ', () => {
    it('should return a single contact details', (done) => {
      server
        .get('/api/v1/contact/102')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken2)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.name).to.equal('Linda');
          expect(res.body.message).to.equal('Contact retrieved successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Update Contact: ', () => {
    it('displays success message after updating a contact successfully', (done) => {
      server
        .put('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken1)
        .type('form')
        .send({ name: 'James' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Contact updated successfully.');
          expect(res.body.data.name).to.equal('James');
          if (err) return done(err);
          done();
        });
      });

    it('displays an error message if user does not input any value to update', (done) => {
      server
        .put('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken2)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please select a field to update');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete Contact: ', () => {
    it('should return a success message after deleting a contact', (done) => {
      server
        .delete('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken3)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Contact deleted successfully.');
          if (err) return done(err);
          done();
        });
    });
  });
});
