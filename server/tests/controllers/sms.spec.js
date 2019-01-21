import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';
import { tokens } from '../seeders/seeds';

const server = supertest.agent(app);

const authToken1 = tokens[0];
const authToken2 = tokens[1];
const authToken4 = tokens[5];

describe('<<< Sms Controller: ', () => {
  describe('Create Sms: ', () => {
    it('should return message for successful sms creation', (done) => {
      server
        .post('/api/v1/sms/contact/102')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken1)
        .type('form')
        .send({ message: 'Did you go to the hospital?' })
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
        .set('x-access-token', authToken1)
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
        .get('/api/v1/sms/sent')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken1)
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
          .get('/api/v1/sms/sent')
          .set('Content-Type', 'application/json')
          .set('x-access-token', authToken4)
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
        .get('/api/v1/sms/received')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken4)
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
          .set('x-access-token', authToken1)
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Contact has no message history');
            if (err) return done(err);
            done();
          });
      });
  });

  describe('Read Sms: ', () => {
    it('should return a successful message and set the sms status to read', (done) => {
      server
        .get('/api/v1/sms/received/101')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken2)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.smsStatus).to.equal('READ');
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('Text message viewed successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete Sms: ', () => {
    it('should return a success message after deleting sms', (done) => {
      server
        .delete('/api/v1/sms/105')
        .set('Content-Type', 'application/json')
        .set('x-access-token', authToken2)
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Text message deleted successfully.');
          if (err) return done(err);
          done();
        });
    });
  });
});
