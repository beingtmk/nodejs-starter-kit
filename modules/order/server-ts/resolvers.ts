import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

import { ORDER_STATES } from '@gqlapp/order-common';
import { log } from '@gqlapp/core-common';
import { LISTING_SUBSCRIPTION, LISTINGS_SUBSCRIPTION } from '@gqlapp/listing-server-ts/resolvers';

import { Orders, Identifier } from './sql';
import settings from '@gqlapp/config';
import { TotalPrice } from '@gqlapp/order-client-react/components/CheckoutCartView';

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

export const ORDER_SUBSCRIPTION = 'order_subscription';
export const ORDERS_SUBSCRIPTION = 'orders_subscription';

const { app } = settings;

export default (pubsub: any) => ({
  Query: {
    order: withAuth((obj: any, { id }: Identifier, { Order }: any) => {
      return Order.order(id);
    }),
    allOrders(obj: any, { orderBy, filter }: any, { Order }: any) {
      return Order.orders(orderBy, filter);
    },
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
    getCart(obj: any, { userId }: { userId: number }, { Order, req: { identity } }: any) {
      if (identity && identity.id) {
        return Order.getCart(userId || identity.id);
      } else {
        return { orderDetails: [] };
      }
    },
    // getCart: withAuth((obj: any, { userId }: { userId: number }, { Order, req: { identity } }: any) => {
    //   return Order.getCart(userId || identity.id);
    // }),
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
        const order = await Order.order(id);
        // pubsub.publish(ORDERS_SUBSCRIPTION, {
        //   ordersUpdated: {
        //     mutation: 'CREATED',
        //     node: order
        //   }
        // });
        pubsub.publish(ORDER_SUBSCRIPTION, {
          orderUpdated: {
            mutation: 'UPDATED',
            id: order.id,
            node: order
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
      if (!input.userId) {
        input.userId = context.req.identity.id;
      }
      const id = await context.Order.addOrder(input);
      const order = await context.Order.order(id);
      pubsub.publish(ORDERS_SUBSCRIPTION, {
        ordersUpdated: {
          mutation: 'CREATED',
          node: order
        }
      });
      return order;
    }),
    editOrderDetail: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        const id = await context.Order.editOrderDetail(input);
        if (id) {
          const order = await context.Order.order(id);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: 'UPDATED',
              node: order
            }
          });
          pubsub.publish(ORDER_SUBSCRIPTION, {
            orderUpdated: {
              mutation: 'UPDATED',
              id: order.id,
              node: order
            }
          });
          return true;
        }
        return false;
      } catch (e) {
        return e;
      }
    }),
    patchOrderState: withAuth(
      async (
        obj: any,
        { orderId, state }: { orderId: number; state: string },
        { Order, Listing, req: { identity } }: any
      ) => {
        const prevOrder = await Order.order(orderId);
        const patch = await Order.patchOrderState(orderId, state);
        if (patch) {
          const order = await Order.order(orderId);
          pubsub.publish(ORDERS_SUBSCRIPTION, {
            ordersUpdated: {
              mutation: prevOrder.orderState.state === ORDER_STATES.STALE ? 'CREATED' : 'UPDATED',
              node: order
            }
          });
          pubsub.publish(ORDER_SUBSCRIPTION, {
            orderUpdated: {
              mutation: 'UPDATED',
              id: order.id,
              node: order
            }
          });

          // Inventory count is changing
          await Promise.all(
            prevOrder.orderDetails.map(async pO => {
              if (
                (pO.orderState.state === ORDER_STATES.STALE || pO.orderState.state === ORDER_STATES.CANCELLED) &&
                state === ORDER_STATES.INITIATED
              ) {
                const listing = await Listing.listing(pO.modalId);
                pubsub.publish(LISTINGS_SUBSCRIPTION, {
                  listingsUpdated: {
                    mutation: 'UPDATED',
                    node: listing
                  }
                });
                pubsub.publish(LISTING_SUBSCRIPTION, {
                  listingUpdated: {
                    mutation: 'UPDATED',
                    id: listing.id,
                    node: listing
                  }
                });
              }
            })
          );
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
            mutation: 'DELETED',
            node: order
          }
        });
        pubsub.publish(ORDER_SUBSCRIPTION, {
          orderUpdated: {
            mutation: 'DELETED',
            id: order.id,
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
        const orderId = await Order.patchAddress(cartId, addressId);
        if (orderId) {
          const order = await Order.order(orderId);
          pubsub.publish(ORDER_SUBSCRIPTION, {
            orderUpdated: {
              mutation: 'UPDATED',
              id: order.id,
              node: order
            }
          });
          return true;
        } else {
          return false;
        }
      }
    ),
    deleteOrderDetail: withAuth(async (obj: any, { id }: { id: number }, { Order }: any) => {
      const orderId = await Order.deleteOrderDetail(id);
      if (orderId) {
        const order = await Order.order(orderId);
        pubsub.publish(ORDER_SUBSCRIPTION, {
          orderUpdated: {
            mutation: 'UPDATED',
            id: order.id,
            node: order
          }
        });
        return true;
      } else {
        throw Error('Failed!');
      }
    }),
    orderStatusMail: withAuth(async (obj: any, { orderId, note }: any, { Order, User, req: { identity }, mailer }) => {
      try {
        if (identity && identity.role === 'admin') {
          if (mailer) {
            const order = await Order.order(orderId);
            const user = await User.getUser(order.consumerId);
            const address =
              order.orderDetails &&
              order.orderDetails &&
              order.orderDetails.length > 0 &&
              order.orderDetails[0].orderDelivery.address;
            // async email
            // const encodedToken = Buffer.from(emailToken).toString('base64');
            const url = `${__WEBSITE_URL__}/order-detail/${order.id}`;
            mailer.sendMail({
              from: `${app.name} <${process.env.EMAIL_SENDER || process.env.EMAIL_USER}>`,
              to: user.email,
              subject: `Regarding your ${app.name} order: ${order.id}`,
              html: `<p>Hi, ${user.username}!</p>
                  <p>Your order has been dispatched.</p>
                  <p>Below are your order details. Please click the following link to view the order details</p>
                  <p><a href="${url}">${url}</a></p>
                  <p>Order id: ${order.id}</p>
                  <p>Total cost: ${TotalPrice(order.orderDetails)}</p>
                  <p>This order will be delivered at: ${address.streetAddress1}, ${address.streetAddress2}, ${
                address.city
              }, ${address.state}, ${address.pinCode}</p>
                <p>${note}</p>
                `
            });
            log.info(`Sent successful order status email to: ${user.email}`);
          }
        } else {
          throw new Error("You don't have the rights to do that.");
        }
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    ordersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDERS_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return payload.ordersUpdated.id === variables.id;
          } else {
            return true;
          }
        }
      )
    },
    orderUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ORDER_SUBSCRIPTION),
        (payload, variables) => {
          return payload.orderUpdated.id === variables.id;
        }
      )
    }
  }
});
