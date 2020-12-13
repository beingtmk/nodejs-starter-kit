import { truncateTables } from '@gqlapp/database-server-ts';
import { decamelizeKeys } from 'humps';

const ADDRESS = {
  streetAddress1: 'Devgiri boys hostel',
  streetAddress2: 'Sinhgad central library',
  city: 'Pune',
  state: 'Maharashtra',
  country: 'India',
  pinCode: 411041,

  firstName: 'Jacob',
  lastName: 'Jones',
  mobile: '8888888888'
};

exports.seed = async knex => {
  await truncateTables(knex, Promise, ['user_address']);
  await Promise.all(
    [...Array(4).keys()].map(async () => {
      const userId = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      await knex('user_address').insert(decamelizeKeys({ userId, ...ADDRESS }));
    })
  );
};
