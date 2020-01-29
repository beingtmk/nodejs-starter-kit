import {
  PubSub
  //  withFilter
} from 'graphql-subscriptions';

export default (pubsub: PubSub) => ({
  Query: {
    async blogs(obj: any, args: any, context: any) {
      return context.Blog.blogs();
    },
    async blog(obj: any, { id }: any, context: any) {
      return context.Blog.blog(id);
    },
    async models(obj: any, args: any, context: any) {
      return context.Blog.models();
    },
    async model(obj: any, { id }: any, context: any) {
      return context.Blog.model(id);
    }
  },
  Mutation: {},
  Subscription: {}
});
