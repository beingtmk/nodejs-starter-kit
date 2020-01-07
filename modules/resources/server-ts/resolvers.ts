import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

import { Resource, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Resource & Identifier;
}
interface ResourceInput {
  input: Resource;
}

interface ResourceInputWithId {
  input: Resource & Identifier;
}

const RESOURCE_SUBSCRIPTION = 'resource_subscription';
const RESOURCES_SUBSCRIPTION = 'resources_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async resources(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, resources } = await context.Resources.resourcesPagination(limit, after, orderBy, filter);
      const hasNextPage = total > after + limit;

      resources.map((resource: Resource & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: resource
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
    async resource(obj: any, { id }: Identifier, context: any) {
      return context.Resources.resource(id);
    }
  },
  Mutation: {
    addResource: withAuth(async (obj: any, { input }: ResourceInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        const id = await context.Resources.addResource(input);
        const resource = await context.Resources.resource(id);
        // publish for resources list
        pubsub.publish(RESOURCES_SUBSCRIPTION, {
          resourcesUpdated: {
            mutation: 'CREATED',
            id,
            node: resource
          }
        });
        return resource;
      } catch (e) {
        return e;
      }
    }),
    deleteResource: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      const resource = await context.Resources.resource(id);
      const isDeleted = await context.Resources.deleteResource(id);
      if (isDeleted) {
        // publish for resource list
        pubsub.publish(RESOURCES_SUBSCRIPTION, {
          resourcesUpdated: {
            mutation: 'DELETED',
            id,
            node: resource
          }
        });
        // publish for edit resource page
        pubsub.publish(RESOURCE_SUBSCRIPTION, {
          resourceUpdated: {
            mutation: 'DELETED',
            id,
            node: resource
          }
        });
        return { id: resource.id };
      } else {
        return { id: null };
      }
    }),
    editResource: withAuth(async (obj: any, { input }: ResourceInputWithId, context: any) => {
      try {
        await context.Resources.editResource(input);
        const resource = await context.Resources.resource(input.id);
        // publish for resource list
        pubsub.publish(RESOURCES_SUBSCRIPTION, {
          resourcesUpdated: {
            mutation: 'UPDATED',
            id: resource.id,
            node: resource
          }
        });
        // publish for edit resource page
        pubsub.publish(RESOURCE_SUBSCRIPTION, {
          resourceUpdated: {
            mutation: 'UPDATED',
            id: resource.id,
            node: resource
          }
        });
        return resource;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    resourceUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(RESOURCE_SUBSCRIPTION),
        (payload, variables) => {
          return payload.resourceUpdated.id === variables.id;
        }
      )
    },
    resourcesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(RESOURCES_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return variables.endCursor <= payload.resourcesUpdated.id;
          } else {
            return true;
          }
        }
      )
    }
  }
});
