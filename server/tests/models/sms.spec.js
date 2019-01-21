import { expect } from 'chai';
import { Sms } from '../../models';

describe('Sms model', () => {

  it('should create a Sms instance', (done) => {
    Sms.create({
      message: 'I am inviting you to my birthday party',
      senderId: 101,
      receiverd: 102,
    })
      .then((sms) => {
        expect(sms.id).to.be.a('number');
        expect(sms.message).to.equal('I am inviting you to my birthday party');
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    Sms.create({
      message: 'I am inviting you to my birthday party',
      senderId: 101,
      receiverd: 102,
    })
      .then((sms) => {
        expect(sms instanceof Sms).to.equal(true);
        done();
      }).catch(err => done(err));
  });
});
