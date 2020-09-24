import { has } from 'lodash';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model, raw } from 'objection';
import { knex, returnId } from '@gqlapp/database-server-ts';

import { User } from '@gqlapp/user-server-ts/sql';
import Addresses from '@gqlapp/addresses-server-ts/sql';
import { ORDER_STATES } from '@gqlapp/order-common';

// Give the knex object to objection.
Model.knex(knex);

interface OrderDetail {
  orderId: number;
  date: string;
  cost: number;
  quantity: number;
  title: string;
  thumbnail: string;
}

export interface Orders {
  id: number;
  userId: number;
  state: string;
  isActive: boolean;
  orderDetails: OrderDetail[];
}

export interface Identifier {
  id: number;
}

const eager = '[consumer, orderState, order_details.[vendor, order_options, order_delivery.address]]';

export default class OrderDAO extends Model {
  // private id: any;

  static get tableName() {
    return 'order';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      consumer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'order.consumer_id',
          to: 'user.id'
        }
      },
      orderState: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderState,
        join: {
          from: 'order.id',
          to: 'order_state.id'
        }
      },
      order_details: {
        relation: Model.HasManyRelation,
        modelClass: OrderDetail,
        join: {
          from: 'order.id',
          to: 'order_detail.order_id'
        }
      }
    };
  }

  public async order(id: number) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async ordersPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = OrderDAO.query().eager(eager);

    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    if (filter) {
      // if (has(filter, 'isActive') && filter.isActive !== '') {
      //   queryBuilder.where(function () {
      //     this.where('listing.is_active', filter.isActive);
      //     // .andWhere('listing_cost.is_active', filter.isActive);
      //   });
      // }

      if (has(filter, 'consumerId') && filter.consumerId !== 0) {
        queryBuilder.where(function () {
          this.where('consumer.id', filter.consumerId);
        });
      }

      if (has(filter, 'state') && filter.state !== '') {
        queryBuilder.where(function () {
          this.where('order_state.state', filter.state);
        });
      }

      // if (has(filter, 'searchText') && filter.searchText !== '') {
      //   queryBuilder.where(function () {
      //     this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
      //       .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
      //       .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['user.username', `%${filter.searchText}%`]))
      //       .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['listing_cost.cost', `%${filter.searchText}%`]));
      //   });
      // }
    }

    queryBuilder
      .from('order')
      .leftJoin('user as vendor', 'vendor.id', 'order.vendor_id')
      .leftJoin('user as consumer', 'consumer.id', 'order.consumer_id')
      .leftJoin('order_state', 'order_state.id', 'order.id');

    const allOrders = camelizeKeys(await queryBuilder);
    const total = allOrders.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);

    return {
      orders: res,
      total
    };
  }

  public async userDeliveries(userId) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('vendor_id', userId)
        .whereNot('state', ORDER_STATES.STALE)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async addToCart(input) {
    // console.log(input);
    const cart = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', input.consumerId)
        .where('state', ORDER_STATES.STALE)
    )[0];

    console.log(cart);
    if (!cart) {
      // Create a STALE order
      input.orderId = await returnId(knex('order')).insert({
        consumer_id: input.consumerId,
        state: ORDER_STATES.STALE
      });
    } else {
      input.orderDetail.orderId = cart.id;
    }

    console.log(input);
    const newOrderDetail = camelizeKeys(await OrderDetail.query().insert(decamelizeKeys(input.orderDetail)));
    console.log('coooooooooooooooooooooooooooooooooooo', newOrderDetail);
    return true;
  }

  public async addOrder(params: Orders) {
    const res = await OrderDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async editOrder(params: Orders & Identifier) {
    const res = await OrderDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async changeDateInCart(params: any) {
    const res = await returnId(
      knex('order_detail')
        .where('id', '=', params.id)
        .update({
          days: params.days,
          start_date: params.startDate,
          end_date: params.endDate,
          total_rent: params.totalRent
        })
    );
    return res;
  }

  public deleteOrderDetail(id: number) {
    return knex('order_detail')
      .where('id', '=', id)
      .del();
  }

  public async patchOrder(id: any, params: any) {
    // console.log('patchOrder called!');
    // To Do: This supposedly is'nt returning the id
    const order = await OrderDAO.query()
      .findById(id)
      .patch(params);
    // console.log(order);
    return order.id;
  }

  public async patchOrderDetail(id: any, params: any) {
    // console.log('patchOrderDetail called!');
    const orderDetail = await OrderDetail.query()
      .findById(id)
      .patch(params);
    // console.log(orderDetail);
    return orderDetail.id;
  }

  public deleteOrder(id: number) {
    return knex('order')
      .where('id', '=', id)
      .del();
  }

  public async asyncForEach(array: any, callback: any) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  public async orderDetailsList(listingId: number) {
    const res = camelizeKeys(
      await OrderDetail.query()
        .eager(eager_od)
        .where('listing_id', listingId)
    );
    return res;
  }

  public async orderDetail(id: number) {
    const res = camelizeKeys(
      await OrderDetail.query()
        .eager('[order.[order_details]]')
        .findById(id)
    );
    return res;
  }
}

class OrderState extends Model {
  static get tableName() {
    return 'order_state';
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
          from: 'order_state.id',
          to: 'order.id'
        }
      }
    };
  }
}

class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      vendor: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'order_detail.vendor_id',
          to: 'user.id'
        }
      },
      order_options: {
        relation: Model.HasOneRelation,
        modelClass: OrderOption,
        join: {
          from: 'order_detail.id',
          to: 'order_option.order_detail_id'
        }
      },
      order_delivery: {
        relation: Model.HasOneRelation,
        modelClass: OrderDelivery,
        join: {
          from: 'order_detail.id',
          to: 'order_delivery.order_detail_id'
        }
      }
    };
  }
}

class OrderOption extends Model {
  static get tableName() {
    return 'order_option';
  }

  static get idColumn() {
    return 'id';
  }

  // static get relationMappings() {
  //   return {
  //     order_detail: {
  //       relation: Model.BelongsToOneRelation,
  //       modelClass: OrderDAO,
  //       join: {
  //         from: 'order_option.order_detail_id',
  //         to: 'order_detail.id'
  //       }
  //     }
  //   };
  // }
}

class OrderDelivery extends Model {
  static get tableName() {
    return 'order_delivery';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      // order_detail: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: OrderDAO,
      //   join: {
      //     from: 'order_delivery.order_detail_id',
      //     to: 'order_detail.id'
      //   }
      // }
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Addresses,
        join: {
          from: 'order_delivery.address_id',
          to: 'user_address.id'
        }
      }
    };
  }
}

export const OrderDetailDAO = new OrderDetail();
