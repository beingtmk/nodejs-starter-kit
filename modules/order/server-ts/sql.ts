import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model } from 'objection';
import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';
// import { User, UserAddress } from '@gqlapp/user-server-ts/sql';
import Listing from '@gqlapp/listing-server-ts/sql';

// import { has } from 'lodash';
import STATES from './constants/order_states';

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


export interface Order {
  id: number;
  userId: number;
  state: string;
  isActive: boolean;
  orderDetails: OrderDetail[];
}

export interface Identifier {
  id: number;
}

const eager_od = '[order]';
// const eager =
//   '[user.[profile], user_address, order_details.[extension.[order_detail], listing.[user.[profile], listing_images,  listing_detail.damages, listing_rental, listing_content]], order_payment, cards]';

const eager =
  '[order_details]';

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
      // user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User,
      //   join: {
      //     from: 'order.user_id',
      //     to: 'user.id'
      //   }
      // },
      order_details: {
        relation: Model.HasManyRelation,
        modelClass: OrderDetail,
        join: {
          from: 'order.id',
          to: 'order_detail.order_id'
        }
      },
    };
  }

  public async getOrders(limit: number, after: number, orderBy: any, filter: any) {
    // To Do Change return type

    const queryBuilder = OrderDAO.query().eager(eager);
    // console.log(await queryBuilder);

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

    // if (filter) {
    //   if (has(filter, 'gearCategory') && filter.gearCategory !== '') {
    //     queryBuilder.where(function() {
    //       this.where('gear_category', filter.gearCategory);
    //     });
    //   }

    //   if (has(filter, 'gearSubcategory') && filter.gearSubcategory !== '') {
    //     queryBuilder.where(function() {
    //       this.where('gear_subcategory', filter.gearSubcategory);
    //     });
    //   }

    //   if (has(filter, 'searchText') && filter.searchText !== '') {
    //     queryBuilder
    //       .from('order')
    //       .leftJoin('order_content AS ld', 'ld.order_id', 'order.id')
    //       .where(function() {
    //         this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.model', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.gear', `%${filter.searchText}%`]))
    //           .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.brand', `%${filter.searchText}%`]));
    //       });
    //   }
    // }

    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    console.log(OrderDAO.query());
    return res;
  }

  public async userDeliveries(userId) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('vendor_id', userId)
        .whereNot('state', STATES.STALE)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }


  public async userOrders(userId) {
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', userId)
        .whereNot('state', STATES.STALE)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public getTotal() {
    return knex('order')
      .countDistinct('id as count')
      .first();
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

  public async addToCart(input) {
    // console.log(input);
    const cart = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', input.consumerId)
        .where('state', STATES.STALE)
    )[0];

    console.log(cart);
    if (!cart) {
      // Create a STALE order
        input.orderId = await returnId(knex('order')).insert({
        consumer_id: input.consumerId,
        state: STATES.STALE
      });
    }else input.orderDetail.orderId = cart.id;

    console.log(input);
    const newOrderDetail = camelizeKeys(await OrderDetail.query().insert(decamelizeKeys(input.orderDetail)));
    console.log('coooooooooooooooooooooooooooooooooooo', newOrderDetail);
    return true;
  }

  public async getCart(userId: number) {
    // To Do - Get or Create
    const res = camelizeKeys(
      await OrderDAO.query()
        .where('consumer_id', userId)
        .where('state', STATES.STALE)
        .eager(eager)
        .orderBy('id', 'desc')
    );

    if (!res.length) {
      // Create a STALE order
      const order_stale_id = await returnId(knex('order')).insert({
        consumer_id: userId,
        state: STATES.STALE
      });
      const order_stale = await this.order(order_stale_id);
      // console.log(order_stale);
      return order_stale;
    }

    // console.log(res);
    return res[0];
  }

  public async addOrder(params: Order) {
    const res = await OrderDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
  }

  public async editOrder(params: Order & Identifier) {
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

// OrderDetail model.
class OrderDetail extends Model {
  static get tableName() {
    return 'order_detail';
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
          from: 'order_detail.order_id',
          to: 'order.id'
        }
      }
    };
  }
}

export const OrderDetailDAO = new OrderDetail();