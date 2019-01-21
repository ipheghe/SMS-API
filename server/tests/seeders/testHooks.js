
import { Contact, Sms } from '../../models';
import {
  seedContacts,
  seedSms,
} from './seeds';

export const populateContacts = () => {
  Contact.bulkCreate(seedContacts).then(() => {
    return;
  });
};

export const populateSms = () => {
  Sms.bulkCreate(seedSms).then(() => {
    return;
  });
};

export const doBeforeAll = () => {
  before((done) => {
    Contact.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    Sms.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    populateContacts();
    populateSms();

    done();
  });
};
