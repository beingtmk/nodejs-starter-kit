import withAuth from 'graphql-auth';
import schedule from 'node-schedule';
import { withFilter } from 'graphql-subscriptions';

import { ORDER_STATES } from '@gqlapp/order-common';
import { ORDER_SUBSCRIPTION, ORDERS_SUBSCRIPTION } from '@gqlapp/order-server-ts/resolvers';

import { Discount as Discounts, Identifier } from './sql';

export const DISCOUNT_SUBSCRIPTION = 'discount_subscription';
export const DISCOUNTS_SUBSCRIPTION = 'discounts_subscription';
interface Edges {
  cursor: number;
  node: Discounts & Identifier;
}

interface DiscountInput {
  input: Discounts;
}

interface DiscountInputWithId {
  input: Discounts & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async discounts(obj: any, { limit, after, orderBy, filter }: any, { Discount, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, discounts } = await Discount.discountsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      discounts.map((discount: Discounts & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: discount
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
    },
    async discount(obj: any, { id }: Identifier, { Discount }: any) {
      return Discount.discount(id);
    },
    async modalDiscount(obj: any, { modalName, modalId }: { modalName: string; modalId: number }, { Discount }: any) {
      return Discount.modalDiscount(modalName, modalId);
    }
  },
  Mutation: {
    addDiscount: withAuth(async (obj: any, { input }: DiscountInput, { Discount, Order, Listing }: any) => {
      try {
        const res = await Discount.addDiscount(input);
        pubsub.publish(DISCOUNT_SUBSCRIPTION, {
          discountUpdated: {
            mutation: 'UPDATED',
            modalId: res.modalId,
            node: res
          }
        });
        pubsub.publish(DISCOUNTS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'CREATED',
            id: res.id,
            node: res
          }
        });
        if (res) {
          schedule.scheduleJob(`discount_${res.id}`, res.discountDuration.endDate, async () => {
            // console.log('job initialed', res.discountDuration.endDate);
            const filter = { state: ORDER_STATES.STALE };
            const orders = await Order.orders({}, filter);
            Promise.all(
              orders.map(async order => {
                await Promise.all(
                  order.orderDetails.map(async ordDtl => {
                    if (
                      res.modalName === 'listing' &&
                      ordDtl.modalName === 'listing' &&
                      ordDtl.modalId === res.modalId
                    ) {
                      const listing = await Listing.listing(ordDtl.modalId);
                      const cost = listing.listingCostArray[0].cost;
                      // tslint:disable-next-line:radix
                      await Order.editOrderDetail({ id: ordDtl.id, listingCost: parseInt(cost.toFixed(2)) });
                      await Discount.deleteDiscount(res.id);
                    }
                  })
                );
                const newOrder = await Order.order(order.id);
                pubsub.publish(ORDERS_SUBSCRIPTION, {
                  ordersUpdated: {
                    mutation: 'UPDATED',
                    node: newOrder
                  }
                });
                pubsub.publish(ORDER_SUBSCRIPTION, {
                  orderUpdated: {
                    mutation: 'UPDATED',
                    id: newOrder.id,
                    node: newOrder
                  }
                });
              })
            );
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    }),
    editDiscount: withAuth(async (obj: any, { input }: DiscountInputWithId, { Discount, Order, Listing }: any) => {
      try {
        const res = await Discount.editDiscount(input);
        const discount = await Discount.discount(res.id);
        // publish for edit discount page
        pubsub.publish(DISCOUNT_SUBSCRIPTION, {
          discountUpdated: {
            mutation: 'UPDATED',
            modalId: res.modalId,
            node: discount
          }
        });
        pubsub.publish(DISCOUNTS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'UPDATED',
            id: discount.id,
            node: discount
          }
        });
        if (res) {
          const filter = { state: ORDER_STATES.STALE };
          const orders = await Order.orders({}, filter);
          Promise.all(
            orders.map(async order => {
              await Promise.all(
                order.orderDetails.map(async ordDtl => {
                  if (res.modalName === 'listing' && ordDtl.modalName === 'listing' && ordDtl.modalId === res.modalId) {
                    const listing = await Listing.listing(ordDtl.modalId);
                    const cost = listing.listingCostArray[0].cost;
                    await Order.editOrderDetail({
                      id: ordDtl.id,
                      // tslint:disable-next-line:radix
                      listingCost: parseInt(cost && (cost - cost * (res.discountPercent / 100)).toFixed())
                    });
                  }
                })
              );
              const newOrder = await Order.order(order.id);
              pubsub.publish(ORDERS_SUBSCRIPTION, {
                ordersUpdated: {
                  mutation: 'UPDATED',
                  node: newOrder
                }
              });
              pubsub.publish(ORDER_SUBSCRIPTION, {
                orderUpdated: {
                  mutation: 'UPDATED',
                  id: newOrder.id,
                  node: newOrder
                }
              });
            })
          );
          const discountSchedule = schedule.scheduledJobs[`discount_${res.id}`];
          if (discountSchedule) {
            discountSchedule.cancel();
          }
          if (res.discountDuration && res.discountDuration.startDate && res.discountDuration.endDate) {
            schedule.scheduleJob(`discount_${res.id}`, res.discountDuration.endDate, async () => {
              // schedule.cancelJob(`discount_${res.id}`);
              // console.log('job initialed', res.discountDuration.endDate);
              Promise.all(
                orders.map(async order => {
                  await Promise.all(
                    order.orderDetails.map(async ordDtl => {
                      if (
                        res.modalName === 'listing' &&
                        ordDtl.modalName === 'listing' &&
                        ordDtl.modalId === res.modalId
                      ) {
                        const listing = await Listing.listing(ordDtl.modalId);
                        const cost = listing.listingCostArray[0].cost;
                        // tslint:disable-next-line:radix
                        await Order.editOrderDetail({ id: ordDtl.id, listingCost: parseInt(cost.toFixed(2)) });
                        await Discount.deleteDiscount(res.id);
                      }
                    })
                  );
                  const newOrder = await Order.order(order.id);
                  pubsub.publish(ORDERS_SUBSCRIPTION, {
                    ordersUpdated: {
                      mutation: 'UPDATED',
                      node: newOrder
                    }
                  });
                  pubsub.publish(ORDER_SUBSCRIPTION, {
                    orderUpdated: {
                      mutation: 'UPDATED',
                      id: newOrder.id,
                      node: newOrder
                    }
                  });
                })
              );
            });
          }
        }
        return true;
      } catch (e) {
        return e;
      }
    }),
    deleteDiscount: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const discount = await context.Discount.discount(id);
      const isDeleted = await context.Discount.deleteDiscount(id);
      if (isDeleted) {
        pubsub.publish(DISCOUNTS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'DELETED',
            id,
            node: discount
          }
        });
        pubsub.publish(DISCOUNT_SUBSCRIPTION, {
          discountUpdated: {
            mutation: 'DELETED',
            modalId: discount.modalId,
            node: discount
          }
        });
        return true;
      } else {
        return false;
      }
    })
  },
  Subscription: {
    discountUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(DISCOUNT_SUBSCRIPTION),
        (payload, variables) => {
          return payload.discountUpdated.modalId === variables.modalId;
        }
      )
    },
    discountsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(DISCOUNTS_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return variables.endCursor <= payload.discountsUpdated.id;
          } else {
            return true;
          }
        }
      )
    }
  }
});
