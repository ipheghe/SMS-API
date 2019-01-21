import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { invalidToken } from '../seeders/seeds';

const server = supertest.agent(app);

describe('<<< RequireAuth Middleware: ', () => {
  describe('Authenticate Routes: ', () => {
    it('should deny route access to unauthenticated users if no token is provided', (done) => {
        server
          .get('/api/v1/sms')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('No token provided!');
            if (err) return done(err);
            done();
          });
      });

    it('should deny route access to unauthenticated users with invalid token', (done) => {
        server
          .get('/api/v1/sms')
          .set('Content-Type', 'application/json')
          .set('x-access-token', invalidToken)
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('Invalid Token');
            if (err) return done(err);
            done();
          });
      });
  });
});
