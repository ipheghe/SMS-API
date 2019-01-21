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

  describe('Get Sent Messages: ', () => {
    it('displays success message after getting all sent messages', (done) => {
      server
        .get('/api/v1/sms/sent/101')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.message).to.equal('All contact\'s sent text messages retrieved successfully.');
          if (err) return done(err);
          done();
        });
      });

      it('displays an error message if contact has no history of sent messages', (done) => {
        server
          .get('/api/v1/sms/sent/104')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Contact has no message history');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Get Received Messages: ', () => {
    it('displays success message after getting all received messages', (done) => {
      server
        .get('/api/v1/sms/received/104')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          expect(res.body.message).to.equal('All contact\'s received text messages retrieved successfully.');
          if (err) return done(err);
          done();
        });
      });

      it('displays an error message if contact has no history of received messages', (done) => {
        server
          .get('/api/v1/sms/received/101')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Contact has no message history');
            if (err) return done(err);
            done();
          });
      });
  });
});
