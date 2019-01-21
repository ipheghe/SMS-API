import { expect } from 'chai';
import { Contact } from '../../models';
import { doBeforeAll } from '../seeders/testHooks';

describe('Contact model', () => {
  doBeforeAll();

  it('should create a contact instance', (done) => {
    Contact.create({
      name: 'testUser1',
      phoneNumber: 234702384899,
    })
      .then((contact) => {
        expect(contact.id).to.be.a('number');
        expect(contact.name).to.equal('testUser1');
        expect(parseInt(contact.phoneNumber, 10)).to.equal(234702384899);
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    Contact.create({
      name: 'testuser2',
      phoneNumber: 234702384891,
    })
      .then((contact) => {
        expect(contact instanceof Contact).to.equal(true);
        done();
      }).catch(err => done(err));
  });
});
