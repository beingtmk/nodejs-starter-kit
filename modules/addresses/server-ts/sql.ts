import { knex, returnId } from '@gqlapp/database-server-ts';
import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

import OrderDAO from '@gqlapp/order-server-ts/sql';

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

  firstName: string;
  lastName: string;
  mobile: string;

  isDefault: boolean;
}

export interface Identifier {
  id: number;
}

export default class Addresses extends Model {
  private id: any;
  static get tableName() {
    return 'user_address';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderDAO,
        join: {
          from: 'user_address.id',
          to: 'order.address_id'
        }
      }
    };
  }

  public async address(id: number) {
    return camelizeKeys(await Addresses.query().findById(id));
  }

  public async getDefaultAddressId(id: number) {
    const address = camelizeKeys(
      await Addresses.query()
        .where('user_id', '=', id)
        .andWhere('is_default', true)
        .orderBy('id', 'desc')
    );
    return address.length > 0 ? address[0].id : 0;
  }

  public async addresses(id: number) {
    return camelizeKeys(
      await Addresses.query()
        .where('user_id', '=', id)
        .orderBy('id', 'desc')
    );
  }

  public async setDefaultAddress(userId: number, id: number) {
    const address = camelizeKeys(await Addresses.query().where('user_id', userId));
    const ids = address.filter((a: Address) => a.isDefault);
    if (ids.length > 0) {
      this.addOrEditAddress({ id: ids[0].id, isDefault: false });
    }
    this.addOrEditAddress({ id, isDefault: true });
    return true;
  }

  public async addAddress(params: Address) {
    const res = returnId(await Addresses.query().insertGraph(decamelizeKeys(params)));
    return this.address(res.id);
  }

  public async addOrEditAddress(params: Address) {
    if (params.id) {
      // const status = await this.addressStatus(params);
      return camelizeKeys(await Addresses.query().upsertGraph(decamelizeKeys(params)));
    } else {
      // perform address add
      delete params.id;
      return camelizeKeys(await Addresses.query().insertGraph(decamelizeKeys(params)));
      // return this.address(res.id);
    }
  }

  public deleteAddress(id: number) {
    return knex('user_address')
      .where('id', '=', id)
      .del();
  }
}
