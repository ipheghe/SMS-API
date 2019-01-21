import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

const server = supertest.agent(app);

const authToken = tokens[0];
const unauthToken = tokens[3];
const stringToken = tokens[4];

describe('<<< Sms Validation Middleware: ', () => {
  describe('Create Sms Validation: ', () => {
    it('should return an error message for null message field', (done) => {
      server
        .post('/api/v1/sms/contact/102')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
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
        .get('/api/v1/sms/sent')
        .set('Content-Type', 'application/json')
        .set('x-access-token', stringToken)
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
        .get('/api/v1/sms/sent')
        .set('Content-Type', 'application/json')
        .set('x-access-token', unauthToken)
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
        .post('/api/v1/sms/contact/c')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({ message: 'hello there' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent receiverId', (done) => {
      server
        .post('/api/v1/sms/contact/192')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .send({ message: 'hello there' })
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
        .set('x-access-token', authToken)
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
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Sms does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for trying do delete another contact\'s message', (done) => {
      server
        .delete('/api/v1/sms/103')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Access Denied!');
          if (err) return done(err);
          done();
        });
    });
  });
});
