import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
// import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';
import { Identifier } from './sql';

// import { withFilter } from 'graphql-subscriptions';
import moment from 'moment';

const ORDERS_SUBSCRIPTION = 'orders_subscription';

export default (pubsub: any) => ({
  Query: {
    orders(obj, { limit, after, orderBy, filter }, { Order, req: { identity } }) {
      if (identity) {
        return Order.getOrders(limit, after, orderBy, filter);
      } else {
        return null;
      }
    },
    userOrders(obj, { userId }, { Order, req: { identity } }) {
      // To Do - Check if admin return with userId or identity.id

      if (identity) {
        return Order.userOrders(identity.id);
      } else {
        return null;
      }
    },
    userDeliveries(obj, { userId }, { Order, req: { identity } }) {
      // To Do - Check if admin return with userId or identity.id

      if (identity) {
        return Order.userDeliveries(identity.id);
      } else {
        return null;
      }
    },
    order(obj: any, { id }: Identifier, { Order, req: { identity } }) {
      return Order.order(id);
    },
    getCart(obj: any, { userId }: any, { Order, req: { identity } }) {
      // To Do - Check if admin return with userId or identity.id

      const res = Order.getCart(identity.id);
      // const res = Order.getCart(userId);

      return res;
    }
  },
  Mutation: {
    addToCart: withAuth(async (obj: any, { input }: any, { Order, req: { identity } }) => {
      // To Do - Check if admin
      try {
        if (!input.consumerId) {
          input.consumerId = identity.id;
        }
        const id = await Order.addToCart(input);
        if (id) {
          console.log('resolver2', id);
          const orderItem = await Order.order(id);
          console.log('resolver2', orderItem);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'CREATED',
              node: orderItem
            }
          });
          return true;
        }
        return false;
      } catch (e) {
        return e;
      }
    }),
    changeDateInCart: withAuth(async (obj: any, { input }: any, context: any) => {
      // To Do - Check if admin
      try {
        const id = await context.Order.changeDateInCart(input);
        if (id) {
          return true;
        }
        return false;
      } catch (e) {
        return e;
      }
    }),
    addOrder: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        const id = await context.Order.addOrder(input);
        const order = await context.Order.order(id);

        return order;
      } catch (e) {
        return e;
      }
    }),
    editOrder: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        await context.Order.editOrder(input);
        const order = await context.Order.order(input.id);
        pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'CREATED',
              node: order
            }
          });
        return order;
      } catch (e) {
        return e;
      }
    }),
    patchOrder: withAuth(async (obj: any, { input }: any, { Order, req: { identity } }) => {
      try {
        if (identity && identity.role === 'admin') {
          const id = input.id;
          // console.log(input);
          delete input.id;
          // console.log(input);
          await Order.patchOrder(id, input);

          const order = await Order.order(id);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'CREATED',
              node: order
            }
          });
          return order;
        } else {
          throw new Error("You don't have the rights to do that.");
        }
      } catch (e) {
        return e;
      }
    }),
    deleteOrder: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const order = await context.Order.order(id);
      const isDeleted = await context.Order.deleteOrder(id);
      console.log('order', order);
      const orderItem = await context.Order.order(order.orderDetail[0].orderId);
      if (isDeleted) {
        pubsub.publish(ORDERS_SUBSCRIPTION, {
          ordersUpdated: {
            mutation: 'UPDATED',
            node: orderItem
          }
        });
        return { id: order.id };
      } else {
        return { id: null };
      }
    }),

    deleteOrderDetail: withAuth(async (obj: any, { id }: any, context: any) => {
      const isDeleted = await context.Order.deleteOrderDetail(id);
      if (isDeleted) {
        return true;
      } else {
        throw Error('Failed!');
      }
    })
  },
  Subscription: {
    ordersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDERS_SUBSCRIPTION),
        (payload, variables) => {
          return payload.ordersUpdated.id === variables.id;
        }
      )
    }
  }
});
