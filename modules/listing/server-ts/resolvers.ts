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

export default (pubsub: any) => ({
  Query: {
    async listings(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, listings } = await context.Listing.listingsPagination(limit, after, orderBy, filter);

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
        }
      };
    },
    async listing(obj: any, { id }: Identifier, context: any) {
      return context.Listing.listing(id);
    },
    userListings: withAuth(['user:view:self'], async (obj: any, { userId }: any, context: any) => {
      return context.Listing.userListings(userId || context.req.identity.id);
    })
  },
  Mutation: {
    addListing: withAuth(
      // ["stripe:*"],
      async (obj: any, { input }: ListingInput, context: any) => {
        try {
          if (!input.userId) {
            input.userId = context.identity.id;
          }
          const id = await context.Listing.addListing(input);
          const listing = await context.Listing.listing(id);
          // publish for liswting list
          pubsub.publish(LISTINGS_SUBSCRIPTION, {
            listingsUpdated: {
              mutation: 'CREATED',
              id,
              node: listing
            }
          });
          return listing;
        } catch (e) {
          return e;
        }
      }
    ),
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
        // return { id: listing.id };
        return true;
      } else {
        // return { id: null };
        return false;
      }
    }),
    toggleListingIsActive: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const listing = await context.Listing.listing(id);
      const isActive = !listing.isActive;

      const isToggled = await context.Listing.toggleListingIsActive(id, isActive);

      if (isToggled) {
        const list = await context.Listing.listing(id);
        pubsub.publish(LISTINGS_SUBSCRIPTION, {
          listingsUpdated: {
            mutation: 'UPDATED',
            id: list.id,
            node: list
          }
        });
        // // publish for edit listing page
        pubsub.publish(LISTING_SUBSCRIPTION, {
          listingUpdated: {
            mutation: 'UPDATED',
            id: list.id,
            node: list
          }
        });
        // return { id: list.id };
        return true;
      } else {
        // return { id: null };
        return false;
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
    }
  }
});
