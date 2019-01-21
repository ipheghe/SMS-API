import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';

const server = supertest.agent(app);

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
});
