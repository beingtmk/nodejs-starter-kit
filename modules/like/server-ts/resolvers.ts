import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

const LIKE_SUBSCRIPTION = 'like_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async likes(obj: any, args: any, context: any) {
      return context.Like.likes();
    },
    async typeLikes(obj: any, { input }: any, { Like }: any) {
      return Like.conditionLikes(input);
    },
    async like(obj: any, { id }: any, context: any) {
      return context.Like.like(id);
    },
    async userLike(obj: any, { input }: any, context: any) {
      return context.Like.conditionLikes(input)[0];
    }
  },
  Mutation: {
    addLike: withAuth(async (obj: any, { input }: any, { auth, Like }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }
        const id = await Like.addLike(input);
        const item = await Like.like(id);
        pubsub.publish(LIKE_SUBSCRIPTION, {
          likesUpdated: {
            mutation: 'CREATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteLike: withAuth(async (obj: any, { id }: any, { Like }: any) => {
      try {
        const item = await Like.like(id);
        await Like.deleteLike(id);
        pubsub.publish(LIKE_SUBSCRIPTION, {
          likesUpdated: {
            mutation: 'DELETED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteLikeUser: withAuth(async (obj: any, { input }: any, { auth, Like }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }
        const item = await Like.like(input);
        await Like.deleteLikeUser(input);
        pubsub.publish(LIKE_SUBSCRIPTION, {
          likesUpdated: {
            mutation: 'DELETED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    likesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(LIKE_SUBSCRIPTION),
        (payload, variables) => {
          return payload.likesUpdated.id === variables.id;
        }
      )
    }
  }
});
