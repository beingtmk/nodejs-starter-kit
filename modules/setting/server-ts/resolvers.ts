import { Identifier } from './sql';

export default (pubsub: any) => ({
  Query: {
    async platform(obj: any, { id }: Identifier, context: any) {
      return context.Setting.platform(id);
    }
  },
  Mutation: {},
  Subscription: {}
});
