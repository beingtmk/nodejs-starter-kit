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

export interface Identifier {
  id: number;
}

export default class Addresses extends Model {
  static get tableName() {
    return 'user_address';
  }

  static get idColumn() {
    return 'id';
  }
  public async addresses(id: number) {
    return camelizeKeys(
      await Addresses.query()
        // .from('user_address as ua')
        .where('user_id', '=', id)
        .orderBy('id', 'desc')
    );
  }

  public async addAddress(params: Address) {
    return Addresses.query().insertGraph(decamelizeKeys(params));
  }
}
