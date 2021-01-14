import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

import { MODAL } from '@gqlapp/review-common';
import settings from '@gqlapp/config';
import { ORDER_STATES } from '@gqlapp/order-common';
import { ORDER_SUBSCRIPTION, ORDERS_SUBSCRIPTION } from '@gqlapp/order-server-ts/resolvers';

import { Listing as Listings, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Listings & Identifier;
}

interface ListingInput {
  input: Listings;
}

interface ListingInputWithId {
  input: Listings & Identifier;
}

export const LISTING_SUBSCRIPTION = 'listing_subscription';
export const LISTINGS_SUBSCRIPTION = 'listings_subscription';
export const LISTINGS_BOOKMARK_SUBSCRIPTION = 'listings_bookmark_subscription';
export const LISTING_REVIEW_SUBSCRIPTION = 'listing_review_subscription';

export default (pubsub: any) => ({
  Query: {
    async listings(obj: any, { limit, after, orderBy, filter, ids }: any, { Listing, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, listings, rangeValues } = await Listing.listingsPagination(
        limit,
        after,
        orderBy,
        filter,
        identity && identity.id,
        ids
      );

      const hasNextPage = total > after + limit;

      listings.map((listing: Listings & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        },
        rangeValues
      };
    },
    async listing(obj: any, { id }: Identifier, context: any) {
      return context.Listing.listing(id);
    },
    myListingsBookmark: withAuth(async (obj: any, { userId, limit, after, orderBy, filter }: any, context: any) => {
      const edgesArray: Edges[] = [];
      const { total, listings, rangeValues } = await context.Listing.myListingBookmark(
        userId || context.req.identity.id,
        limit,
        after,
        orderBy,
        filter
      );

      const hasNextPage = total > after + limit;
      listings.map((listing: Listings & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        },
        rangeValues
      };
    }),
    listingBookmarkStatus: withAuth(async (obj: any, { listingId, userId }: any, context: any) => {
      return context.Listing.listingBookmarkStatus(listingId, userId || context.req.identity.id);
    }),
    async canUserReview(obj: any, { listingId, userId }: any, context: any) {
      if (userId || (context.req.identity && context.req.identity.id)) {
        return context.Listing.canUserReview(listingId, userId || context.req.identity.id);
      } else {
        return false;
      }
    },
    async getBrandList(obj: any, arg: any, context: any) {
      return context.Listing.getBrandList();
    }
  },
  Mutation: {
    addListing: withAuth(async (obj: any, { input }: ListingInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.req.identity.id;
        }
        const id = await context.Listing.addListing(input);
        const listing = await context.Listing.listing(id);
        // publish for listing list
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'CREATED',
            id,
            node: listing
          }
        });
        return id;
      } catch (e) {
        return e;
      }
    }),
    duplicateListing: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const newListingid = await context.Listing.duplicateListing(id);
      const listing = await context.Listing.listing(newListingid);
      if (newListingid && listing) {
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'CREATED',
            node: listing
          }
        });
      }
      return newListingid;
    }),
    editListing: withAuth(async (obj: any, { input }: ListingInputWithId, { Listing, Order, Discount }: any) => {
      try {
        const listing = await Listing.listing(input.id);
        await Listing.editListing(input);
        const newListing = await Listing.listing(input.id);
        if (listing) {
          // publish for listing list
          pubsub.publish(LISTINGS_SUBSCRIPTION, {
            listingsUpdated: {
              mutation: 'UPDATED',
              id: newListing.id,
              node: newListing
            }
          });
          // publish for edit listing page
          pubsub.publish(LISTING_SUBSCRIPTION, {
            listingUpdated: {
              mutation: 'UPDATED',
              id: newListing.id,
              node: newListing
            }
          });
        }
        if (
          listing.listingCostArray[0].discount !== newListing.listingCostArray[0].discount ||
          listing.listingCostArray[0].cost !== newListing.listingCostArray[0].cost
        ) {
          const filter = { state: ORDER_STATES.STALE };
          const orders = await Order.orders({}, filter);
          const now = new Date();
          Promise.all(
            orders.map(async order => {
              await Promise.all(
                order.orderDetails.map(async ordDtl => {
                  if (ordDtl.modalName === 'listing' && ordDtl.modalId === newListing.id) {
                    const cost = newListing.listingCostArray[0].cost;
                    const modalDiscount = Discount.modalDiscount('listing', newListing.id);
                    const isDiscountPercent =
                      modalDiscount.discountDuration.startDate <= now &&
                      modalDiscount.discountDuration.endDate >= now &&
                      modalDiscount.discountPercent > 0;
                    const discountPercent = isDiscountPercent ? modalDiscount.discountPercent : null;
                    const discount = isDiscountPercent
                      ? discountPercent
                      : newListing.listingFlags.isDiscount
                      ? newListing.listingCostArray[0].discount
                      : 0;
                    await Order.editOrderDetail({
                      id: ordDtl.id,
                      // tslint:disable-next-line:radix
                      listingCost: parseInt(cost && (cost - cost * (discount / 100)).toFixed())
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
        }
        return true;
      } catch (e) {
        return e;
      }
    }),
    deleteListing: withAuth(async (obj: any, { id }: Identifier, { Listing, Order }: any) => {
      const listing = await Listing.listing(id);
      const isDeleted = await Listing.deleteListing(id);
      if (isDeleted) {
        // publish for listing list
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'DELETED',
            id,
            node: listing
          }
        });
        // publish for edit listing page
        pubsub.publish(LISTING_SUBSCRIPTION, {
          listingUpdated: {
            mutation: 'DELETED',
            id, // import { ONSHELF, ONRENT } from "../common/constants/ListingStates";
            node: listing
          }
        });
        const staleOrder = await Order.orders({}, { state: ORDER_STATES.STALE });
        Promise.all(
          staleOrder.map(async ord => {
            let deleted = false;
            await Promise.all(
              ord.orderDetails.map(async oD => {
                if (oD.modalName === MODAL[1].value && oD.modalId === listing.id) {
                  await Order.deleteOrderDetail(oD.id);
                  deleted = true;
                }
              })
            );
            if (deleted) {
              const newOrder = await Order.order(ord.id);
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
            }
          })
        );
        return true;
      } else {
        return false;
      }
    }),
    addOrRemoveListingBookmark: withAuth(async (obj: any, { listingId, userId }: any, context: any) => {
      // console.log('listingId resolvers', listingId, 'userId', userId);
      const status = await context.Listing.addOrRemoveListingBookmark(listingId, userId);
      // console.log('status', status);

      const list = await context.Listing.listing(listingId);
      if (status) {
        pubsub.publish(LISTINGS_BOOKMARK_SUBSCRIPTION, {
          listingsBookmarkUpdated: {
            mutation: 'CREATED',
            id: list.id,
            node: list
          }
        });
        return 'Added Successfully';
      } else {
        pubsub.publish(LISTINGS_BOOKMARK_SUBSCRIPTION, {
          listingsBookmarkUpdated: {
            mutation: 'DELETED',
            id: list.id,
            node: list
          }
        });
        return 'Removed Successfully';
      }
    }),
    async shareListingByEmail(obj: any, { input }: any, { mailer }: any) {
      if (mailer) {
        const sent = await mailer.sendMail({
          from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
          to: input.email,
          subject: 'Listing',
          html: input.message
        });
        if (!sent) {
          throw new Error("Email couldn't be sent");
        } else {
          return true;
        }
      }
      throw new Error("Email couldn't be sent");
    }
  },
  Subscription: {
    listingsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTINGS_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return variables.endCursor <= payload.listingsUpdated.id;
          } else {
            return true;
          }
        }
      )
    },
    listingUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTING_SUBSCRIPTION),
        (payload, variables) => {
          return payload.listingUpdated.id === variables.id;
        }
      )
    },
    listingsBookmarkUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTINGS_BOOKMARK_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return variables.endCursor <= payload.listingsBookmarkUpdated.id;
          } else {
            return true;
          }
        }
      )
    },
    listingReview: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LISTING_REVIEW_SUBSCRIPTION),
        (payload, variables) => {
          return payload.listingReview.id === variables.id;
        }
      )
    }
  }
});
