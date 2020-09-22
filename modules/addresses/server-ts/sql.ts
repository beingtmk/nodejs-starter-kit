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
    return camelizeKeys(await Addresses.query().where('user_id', '=', id));
  }

  public async addAddress(params: Address) {
    return Addresses.query().insertGraph(decamelizeKeys(params));
  }

  public async addOrEditAddress(params: Address) {
    if (params.id) {
      // const status = await this.addressStatus(params);
      await Addresses.query().upsertGraph(decamelizeKeys(params));
      return 'Address edited';
    } else {
      // perform address add
      await Addresses.query().insertGraph(decamelizeKeys(params));
      return 'Address added';
    }
  }

  public deleteAddress(id: number) {
    return knex('user_address')
      .where('id', '=', id)
      .del();
  }
}
