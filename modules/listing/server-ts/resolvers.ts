import { Listing, Identifier } from './sql';
import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

interface Edges {
  cursor: number;
  node: Listing & Identifier;
}

interface ListingInput {
  input: Listing;
}

interface ListingInputWithId {
  input: Listing & Identifier;
}

const LISTING_SUBSCRIPTION = 'listing_subscription';
const LISTINGS_SUBSCRIPTION = 'listings_subscription';
const LISTINGS_BOOKMARK_SUBSCRIPTION = 'listings_bookmark_subscription';

export default (pubsub: any) => ({
  Query: {
    async listings(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, listings, rangeValues } = await context.Listing.listingsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      listings.map((listing: Listing & Identifier, index: number) => {
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
      listings.map((listing: Listing & Identifier, index: number) => {
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
    })
  },
  Mutation: {
    addListing: withAuth(async (obj: any, { input }: ListingInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
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
        return true;
      } catch (e) {
        return e;
      }
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
    })
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
    }
  }
});
