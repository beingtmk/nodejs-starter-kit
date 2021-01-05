import withAuth from 'graphql-auth';
import { Platform, Identifier } from './sql';

interface PlatformInputWithId {
  input: Platform & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async platform(obj: any, { id }: Identifier, context: any) {
      return context.Setting.platform(id);
    }
  },
  Mutation: {
    editPlatform: withAuth(async (obj: any, { input }: PlatformInputWithId, { Setting }: any) => {
      try {
        await Setting.editPlatform(input);
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
