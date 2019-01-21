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
});
