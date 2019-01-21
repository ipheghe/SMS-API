import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< ContactValidation Middleware: ', () => {
  describe('Create Contact Validation: ', () => {
    it('should return an error message for null name field', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: '',
          phoneNumber: 2348023451234,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for null phone number field', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'emeka',
          phoneNumber: null,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('phone number field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for invalid name length', (done) => {
      server
        .post('/api/v1/contact')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'as',
          phoneNumber: 2348023451234,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name must have more than 2 characters');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('validContact Validation: ', () => {
    it('should return an error message for an invalid contactId', (done) => {
      server
        .get('/api/v1/contact/a')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'emeka',
          phoneNumber: 2348023451234,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent userId', (done) => {
      server
        .get('/api/v1/contact/200')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'emeka',
          phoneNumber: 2348023451234,
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Contact account not available!');
          if (err) return done(err);
          done();
        });
    });
  });
});
