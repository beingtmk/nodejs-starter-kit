import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
import { TypeLike, UserLike, Identifier } from './sql';

interface TypeLikeInput {
  input: TypeLike;
}

interface UserLikeInput {
  input: UserLike;
}

const LIKE_SUBSCRIPTION = 'like_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async likes(obj: any, args: any, context: any) {
      return context.Like.likes();
    },
    async typeLikes(obj: any, { input }: TypeLikeInput, { Like }: any) {
      return Like.conditionLikes(input);
    },
    async like(obj: any, { id }: Identifier, context: any) {
      return context.Like.like(id);
    },
    async userLike(obj: any, { input }: UserLikeInput, context: any) {
      return context.Like.conditionLikes(input)[0];
    }
  },
  Mutation: {
    addLike: withAuth(async (obj: any, { input }: UserLikeInput, { auth, Like }: any) => {
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
    deleteLike: withAuth(async (obj: any, { id }: Identifier, { Like }: any) => {
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
    deleteLikeUser: withAuth(async (obj: any, { input }: UserLikeInput, { auth, Like }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }
        const item = await Like.likeUsingUser(input);
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
