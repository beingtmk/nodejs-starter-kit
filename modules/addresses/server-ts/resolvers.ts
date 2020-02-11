import withAuth from 'graphql-auth';
import Address from './sql';

interface AddressInput {
  input: Address;
}

export default (pubsub: any) => ({
  Query: {},
  Mutation: {
    addAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        await context.Address.addEvent(input);
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
