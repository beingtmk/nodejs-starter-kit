import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

import { Resource } from './sql';

interface ResourceInput {
  input: Resource;
}

export default (pubsub: PubSub) => ({
  Query: {},
  Mutation: {
    addResource:
      // withAuth(
      async (obj: any, { input }: ResourceInput, context: any) => {
        try {
          // console.log('input', input);
          if (!input.userId) {
            input.userId = context.identity.id;
          }
          const id = await context.Resources.addResource(input);
          const resource = await context.Resources.resource(id);
          // // publish for liswting list
          //   pubsub.publish(LISTINGS_SUBSCRIPTION, {
          //     listingsUpdated: {
          //       mutation: "CREATED",
          //       id,
          //       node: listing
          //     }
          //   });
          return resource;
        } catch (e) {
          return e;
        }
      }
    // )
  },
  Subscription: {}
});
