import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< Sms Validation Middleware: ', () => {
  describe('Create Sms Validation: ', () => {
    it('should return an error message for null message field', (done) => {
      server
        .post('/api/v1/sms/101/102')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ message: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('message field cannot be empty');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Valid Sender Validation: ', () => {
    it('should return an error message for an invalid senderId', (done) => {
      server
        .get('/api/v1/sms/sent/b')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent senderId', (done) => {
      server
        .get('/api/v1/sms/sent/190')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Sender\'s account not available!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Valid Receiver Validation: ', () => {
    it('should return an error message for an invalid receiverId', (done) => {
      server
        .get('/api/v1/sms/received/c')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent receiverId', (done) => {
      server
        .get('/api/v1/sms/received/192')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Receiver\'s account not available!');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Valid Sms Validation: ', () => {
    it('should return an error message for an invalid smsId', (done) => {
      server
        .delete('/api/v1/sms/a')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent smsId', (done) => {
      server
        .delete('/api/v1/sms/190')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Sms does not exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
