import { has } from 'lodash';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model, raw } from 'objection';

import { UserInputError } from 'apollo-server-errors';
import { knex, returnId } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
import Addresses from '@gqlapp/addresses-server-ts/sql';
import { ORDER_STATES } from '@gqlapp/order-common';
import ListingDAO from '@gqlapp/listing-server-ts/sql';

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

const eager = '[consumer, order_state, order_details.[vendor, order_options, order_delivery.address, order_state]]';

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
      order_state: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderState,
        join: {
          from: 'order.order_state_id',
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

  public async orders(orderBy, filter) {
    const queryBuilder = OrderDAO.query().eager(eager);
    // console.log(orderBy, filter);
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
        queryBuilder.where(function() {
          this.where('consumer.id', filter.consumerId);
        });
      }

      if (has(filter, 'vendorId') && filter.vendorId !== 0) {
        queryBuilder.where(function() {
          this.where('vendor.id', filter.vendorId);
        });
      }

      if (has(filter, 'state') && filter.state !== '') {
        const state = await OrderState.query().where('state', '=', filter.state);
        queryBuilder.where(function() {
          this.where('order.order_state_id', '=', state[0].id);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['consumer.username', `%${filter.searchText}%`]));
          // this.where('consumer.username', 'ilike', `%${filter.searchText}%`);
        });
      }
    }

    queryBuilder
      .from('order')
      .leftJoin('user as consumer', 'consumer.id', 'order.consumer_id')
      .leftJoin('order_state', 'order_state.id', 'order.order_state_id')
      .leftJoin('order_detail', 'order_detail.order_id', 'order.id')
      .leftJoin('user as vendor', 'vendor.id', 'order_detail.vendor_id')
      .groupBy('order.id', 'consumer.username', 'order_state.state');

    return camelizeKeys(await queryBuilder);
  }

  public async ordersPagination(limit: number, after: number, orderBy: any, filter: any) {
    const orderState = camelizeKeys(await OrderState.query().where('state', '=', ORDER_STATES.STALE))[0];
    const queryBuilder = OrderDAO.query()
      .eager(eager)
      .whereNot('order_state_id', orderState.id);

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
        queryBuilder.where(function() {
          this.where('consumer.id', filter.consumerId).whereNot('order.order_state_id', '=', orderState.id);
        });
      }

      if (has(filter, 'vendorId') && filter.vendorId !== 0) {
        queryBuilder.where(function() {
          this.where('vendor.id', filter.vendorId).whereNot('order.order_state_id', '=', orderState.id);
        });
      }

      if (has(filter, 'state') && filter.state !== '') {
        const state = await OrderState.query().where('state', '=', filter.state);
        queryBuilder.where(function() {
          this.where('order.order_state_id', '=', state[0].id);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['consumer.username', `%${filter.searchText}%`]));
          // this.where('consumer.username', 'ilike', `%${filter.searchText}%`);
        });
      }
    }

    queryBuilder
      .from('order')
      .leftJoin('user as consumer', 'consumer.id', 'order.consumer_id')
      .leftJoin('order_state', 'order_state.id', 'order.order_state_id')
      .leftJoin('order_detail', 'order_detail.order_id', 'order.id')
      .leftJoin('user as vendor', 'vendor.id', 'order_detail.vendor_id')
      .groupBy('order.id', 'consumer.username', 'order_state.state');

    const allOrders = camelizeKeys(await queryBuilder);
    const total = allOrders.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);

    return {
      orders: res,
      total
    };
  }

  public async getCart(userId: number) {
    const orderState = camelizeKeys(await OrderState.query().where('state', '=', ORDER_STATES.STALE))[0];
    // console.log('orderState', orderState);

    // To Do - Get or Create
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', userId)
        .where('order_state_id', orderState.id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    if (!res.length) {
      // Create a STALE order
      const staleOrderId = await returnId(knex('order')).insert({
        consumer_id: userId,
        order_state_id: orderState.id
      });
      const staleOrder = await this.order(staleOrderId);
      // console.log(staleOrder);
      return staleOrder;
    }

    // console.log(res);
    return res[0];
  }

  public async orderStates() {
    return camelizeKeys(await OrderState.query().whereNot('state', '=', ORDER_STATES.STALE));
  }

  // public async userDeliveries(userId: number) {
  //   const res = camelizeKeys(
  //     await OrderDAO.query()
  //       .where('vendor_id', userId)
  //       .whereNot('state', ORDER_STATES.STALE)
  //       .eager(eager)
  //       .orderBy('id', 'desc')
  //   );
  //   // console.log(res);
  //   return res;
  // }

  public async addToCart(input) {
    // console.log(input);

    const orderState = camelizeKeys(await OrderState.query().where('state', '=', ORDER_STATES.STALE))[0];
    // console.log('orderState', orderState);

    const cart = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', input.consumerId)
        .where('order_state_id', orderState.id)
    )[0];

    // console.log(cart);
    if (!cart) {
      // Create a STALE order
      knex('order').insert({
        consumer_id: input.consumerId,
        order_state_id: ORDER_STATES.STALE
      });
    } else {
      input.orderDetail.orderId = cart.id;
      input.orderDetail.orderDetailStateId = orderState.id;
    }

    // console.log(input);
    const newOrderDetail = camelizeKeys(await OrderDetail.query().insertGraph(decamelizeKeys(input.orderDetail)));
    // console.log('coooooooooooooooooooooooooooooooooooo', newOrderDetail);
    return newOrderDetail.orderId;
  }

  public async addOrder(params: Orders) {
    const res = await OrderDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async editOrderDetail(input: OrderDetail) {
    const orderDetail = camelizeKeys(await OrderDetail.query().findById(input.id));
    if (input.orderOptions) {
      const orderDetailUpdated = camelizeKeys(
        await OrderDetail.query().upsertGraph(
          decamelizeKeys({
            id: orderDetail.id,
            cost: input.listingCost,
            orderOptions: {
              id: input.orderOptions.id,
              quantity: input.orderOptions.quantity
            }
          })
        )
      );
    } else {
      const orderDetailUpdated = camelizeKeys(
        await OrderDetail.query().upsertGraph(
          decamelizeKeys({
            id: orderDetail.id,
            cost: input.listingCost
          })
        )
      );
    }
    // console.log(orderDetail);
    return orderDetail.orderId;
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
  public async patchAddressForOrderDetail(orderDetailId: number, addressId: number) {
    const orderDetail = camelizeKeys(
      await OrderDetail.query()
        .eager('order_delivery')
        .findById(orderDetailId)
    );
    if (!orderDetail.orderDelivery) {
      await OrderDetail.query().upsertGraph(decamelizeKeys({ id: orderDetail.id, orderDelivery: { addressId } }));
    } else {
      await OrderDetail.query().upsertGraph(
        decamelizeKeys({ id: orderDetail.id, orderDelivery: { id: orderDetail.orderDelivery.id, addressId } })
      );
    }
    return orderDetail.orderId;
  }
  public async patchAddress(cartId: number, addressId: number) {
    const order = camelizeKeys(
      await OrderDAO.query()
        .eager(eager)
        .findById(cartId)
    );
    await Promise.all(order.orderDetails.map(oD => this.patchAddressForOrderDetail(oD.id, addressId)));
    return order.id;
  }
  public async deleteOrderDetail(id: number) {
    const res = camelizeKeys(await OrderDetail.query().findById(id));
    await knex('order_detail')
      .where('id', '=', id)
      .del();
    return res.orderId;
  }

  public async patchOrderState(orderId: any, state: any) {
    const orderState = camelizeKeys(await OrderState.query().where('state', '=', state))[0];
    const order = camelizeKeys(
      await OrderDAO.query()
        .eager(eager)
        .findById(orderId)
    );
    if (order && orderState) {
      await Promise.all(
        order.orderDetails.map(async oD => {
          if (oD.orderState.state !== ORDER_STATES.STALE && oD.orderState.state !== ORDER_STATES.CANCELLED) {
            await OrderDetail.query().upsertGraph(decamelizeKeys({ id: oD.id, orderDetailStateId: orderState.id }));
          }
          if (
            (oD.orderState.state === ORDER_STATES.STALE || oD.orderState.state === ORDER_STATES.CANCELLED) &&
            state === ORDER_STATES.INITIATED
          ) {
            const listing = camelizeKeys(
              await ListingDAO.query()
                .eager('[listing_detail]')
                .findById(oD.modalId)
            );
            if (listing.listingDetail.inventoryCount - oD.orderOptions.quantity >= 0) {
              await ListingDAO.query().upsertGraph(
                decamelizeKeys({
                  id: oD.modalId,
                  listingDetail: {
                    id: listing.listingDetail.id,
                    inventoryCount: listing.listingDetail.inventoryCount - oD.orderOptions.quantity
                  }
                })
              );
              await OrderDetail.query().upsertGraph(decamelizeKeys({ id: oD.id, orderDetailStateId: orderState.id }));
            } else {
              throw new UserInputError('Item out of stock', { errors: 'Item out of stock' });
            }
          }
          if (oD.orderState.state === ORDER_STATES.INITIATED && state === ORDER_STATES.CANCELLED) {
            const listing = camelizeKeys(
              await ListingDAO.query()
                .eager('[listing_detail]')
                .findById(oD.modalId)
            );
            await ListingDAO.query().upsertGraph(
              decamelizeKeys({
                id: oD.modalId,
                listingDetail: {
                  id: listing.listingDetail.id,
                  inventoryCount: listing.listingDetail.inventoryCount + oD.orderOptions.quantity
                }
              })
            );
          }
        })
      );
      await OrderDAO.query().upsertGraph(decamelizeKeys({ id: order.id, orderStateId: orderState.id }));
    }
    return true;
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

export class OrderState extends Model {
  static get tableName() {
    return 'order_state';
  }

  static get idColumn() {
    return 'id';
  }

  // static get relationMappings() {
  //   return {
  //     order: {
  //       relation: Model.HasManyRelation,
  //       modelClass: OrderDAO,
  //       join: {
  //         from: 'order_state.id',
  //         to: 'order.id'
  //       }
  //     }
  //   };
  // }
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
      },
      order_state: {
        relation: Model.BelongsToOneRelation,
        modelClass: OrderState,
        join: {
          from: 'order_detail.order_detail_state_id',
          to: 'order_state.id'
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
