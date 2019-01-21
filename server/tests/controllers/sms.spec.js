import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< Sms Controller: ', () => {
  describe('Create Sms: ', () => {
    it('should return message for successful sms creation', (done) => {
      server
        .post('/api/v1/sms/101/102')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ message: 'Did you go to the hospital?'  })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('Text message has been successfully sent');
          if (err) return done(err);
          done();
        });
    });
  });
});
