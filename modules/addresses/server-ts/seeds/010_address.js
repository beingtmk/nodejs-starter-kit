import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { decamelizeKeys } from 'humps';

const ADDRESSES = [
  {
    id: 1,
    userId: 1,
    streetAddress1: 'Devgiri boys hostel',
    streetAddress2: 'Sinhgad central library',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: 411041
  },
  {
    id: 2,
    userId: 2,
    streetAddress1: 'Devgiri boys hostel',
    streetAddress2: 'Sinhgad central library',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: 411041
  }
];

exports.seed = async knex => {
  await truncateTables(knex, Promise, ['user_address']);
  await returnId(knex('user_address')).insert(decamelizeKeys(ADDRESSES));
};
