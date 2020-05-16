// import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
// import { knex, returnId, orderedFor } from '@gqlapp/database-server-ts';
import { Identifier } from './sql';

// import { withFilter } from 'graphql-subscriptions';
import moment from 'moment';

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
        return order;
      } catch (e) {
        return e;
      }
    }),
    patchOrder: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        if (context.identity && context.identity.role === 'admin') {
          const id = input.id;
          // console.log(input);
          delete input.id;
          // console.log(input);
          await context.Order.patchOrder(id, input);

          const order = await context.Order.order(id);

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
      if (isDeleted) {
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
  }
});
