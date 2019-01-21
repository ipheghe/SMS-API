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

  describe('Get All Sms: ', () => {
    it('should return all sms messages', (done) => {
      server
        .get('/api/v1/sms')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('All text messages retrieved successfully.');
          if (err) return done(err);
          done();
        });
    });
  });
});