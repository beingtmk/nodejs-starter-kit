import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

import { Orders, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Orders & Identifier;
}

interface OrderInput {
  input: Orders;
}

interface OrderInputWithId {
  input: Orders & Identifier;
}

const ORDERS_SUBSCRIPTION = 'orders_subscription';

export default (pubsub: any) => ({
  Query: {
    order: withAuth((obj: any, { id }: Identifier, { Order }: any) => {
      return Order.order(id);
    }),
    orders: withAuth(
      async (
        obj: any,
        {
          limit,
          after,
          orderBy,
          filter
        }: {
          limit: number;
          after: number;
          orderBy: object;
          filter: object;
        },
        { Order }: any
      ) => {
        const edgesArray: Edges[] = [];
        const { total, orders } = await Order.ordersPagination(limit, after, orderBy, filter);

        const hasNextPage = total > after + limit;

        orders.map((order: Orders & Identifier, index: number) => {
          edgesArray.push({
            cursor: after + index,
            node: order
          });
        });
        const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

        return {
          totalCount: total,
          edges: edgesArray,
          pageInfo: {
            endCursor,
            hasNextPage
          }
        };
      }
    ),
    getCart: withAuth((obj: any, { userId }: { userId: number }, { Order, req: { identity } }: any) => {
      return Order.getCart(userId || identity.id);
    }),
    orderStates: withAuth((obj: any, {}: any, { Order, req: { identity } }: any) => {
      return Order.orderStates();
    })
    // userDeliveries: withAuth((obj: any, { userId }: { userId: number }, { Order, req: { identity } }: any) => {
    //   return Order.userDeliveries(userId || identity.id);
    // })
  },
  Mutation: {
    addToCart: withAuth(async (obj: any, { input }: any, { Order, req: { identity } }) => {
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
    patchOrderState: withAuth(
      async (obj: any, { orderId, state }: { orderId: number; state: string }, { Order, req: { identity } }: any) => {
        const patch = await Order.patchOrderState(orderId, state);
        if (patch) {
          const order = await Order.order(orderId);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'CREATED',
              node: order
            }
          });
          return true;
        } else {
          return false;
        }
      }
    ),
    deleteOrder: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const order = await context.Order.order(id);
      const isDeleted = await context.Order.deleteOrder(id);
      if (isDeleted) {
        pubsub.publish(ORDERS_SUBSCRIPTION, {
          ordersUpdated: {
            mutation: 'UPDATED',
            node: order
          }
        });
        return true;
      } else {
        return false;
      }
    }),
    patchAddress: withAuth(
      async (obj: any, { cartId, addressId }: { cartId: number; addressId: number }, { Order, req: { identity } }) => {
        try {
          const orderId = await Order.patchAddress(cartId, addressId);
          const orderItem = await Order.order(orderId);
          // console.log('resolver2', orderItem);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'ADDRESS_UPDATED',
              node: orderItem
            }
          });
          return true;
        } catch (e) {
          return e;
        }
      }
    ),
    deleteOrderDetail: withAuth(async (obj: any, { id }: { id: number }, { Order }: any) => {
      const isDeleted = await Order.deleteOrderDetail(id);
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
