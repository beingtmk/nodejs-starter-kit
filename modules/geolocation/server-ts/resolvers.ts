import { PubSub } from 'graphql-subscriptions';

import { withFilter } from 'graphql-subscriptions';

const LOCATION_SUBSCRIPTION = 'location_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async locations(obj: any, { input, filter }: any, context: any) {
      return context.Geolocation.locations(input, filter);
    },
    async allLocations(obj: any, args: any, context: any) {
      return context.Geolocation.allLocations();
    }
  },
  Mutation: {},
  Subscription: {
    locationUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LOCATION_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.locationUpdated;
          const {
            filter: { distance }
          } = variables;
          const checkByFilter = !distance || distance === node.distance;

          switch (mutation) {
            case 'UPDATED':
              return !checkByFilter;
            default:
              return;
          }
        }
      )
    }
  }
});
