import { Listing as Listings, Identifier } from './sql';
import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';
import settings from '@gqlapp/config';

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
    async listings(obj: any, { limit, after, orderBy, filter }: any, { Listing, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, listings, rangeValues } = await Listing.listingsPagination(
        limit,
        after,
        orderBy,
        filter,
        identity && identity.id
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
    editListing: withAuth(async (obj: any, { input }: ListingInputWithId, context: any) => {
      try {
        await context.Listing.editListing(input);
        const listing = await context.Listing.listing(input.id);
        // publish for listing list
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'UPDATED',
            id: listing.id,
            node: listing
          }
        });
        // publish for edit listing page
        pubsub.publish(LISTING_SUBSCRIPTION, {
          listingUpdated: {
            mutation: 'UPDATED',
            id: listing.id,
            node: listing
          }
        });
        return true;
      } catch (e) {
        return e;
      }
    }),
    deleteListing: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const listing = await context.Listing.listing(id);
      const isDeleted = await context.Listing.deleteListing(id);
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
        return 'Added SuccessFully';
      } else {
        pubsub.publish(LISTINGS_BOOKMARK_SUBSCRIPTION, {
          listingsBookmarkUpdated: {
            mutation: 'DELETED',
            id: list.id,
            node: list
          }
        });
        return 'Removed SuccessFully';
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
