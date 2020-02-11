import { knex } from '@gqlapp/database-server-ts';
import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

// Give the knex object to objection.
Model.knex(knex);

export interface Address {
  id: number;
  userId: number;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  pinCode: number;
}

export default class Addresses extends Model {
  public addresss() {
    return knex.select();
  }

  public addAddress(params: Event) {
    return Address.query().insertGraph(decamelizeKeys(params));
  }
}
