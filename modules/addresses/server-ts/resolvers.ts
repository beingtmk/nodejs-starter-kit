import withAuth from 'graphql-auth';
import { Address } from './sql';
import { Identifier } from './sql';

interface AddressInput {
  input: Address;
}

export default (pubsub: any) => ({
  Query: {
    async addresses(obj: any, { id }: Identifier, context: any) {
      const addresses = await context.Addresses.addresses(id || context.req.identity.id);
      return addresses;
    }
  },
  Mutation: {
    addAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        const address = await context.Addresses.addAddress(input);
        return address;
      } catch (e) {
        return e;
      }
    }),
    addOrEditAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        const address = await context.Addresses.addOrEditAddress(input);
        return address;
      } catch (e) {
        return e;
      }
    }),
    deleteAddress: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      try {
        await context.Addresses.deleteAddress(id);
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
