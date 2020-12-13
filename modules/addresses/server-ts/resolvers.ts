import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';

import { Address } from './sql';
import { Identifier } from './sql';

export const ADDRESSES_SUBSCRIPTION = 'addresses_subscription';

interface AddressInput {
  input: Address;
}

export default (pubsub: any) => ({
  Query: {
    async getDefaultAddressId(obj: any, { userId }: { userId: number }, context: any) {
      const defaultId = await context.Addresses.getDefaultAddressId(userId || context.req.identity.id);
      return defaultId;
    },
    async addresses(obj: any, { id }: Identifier, context: any) {
      const addresses = await context.Addresses.addresses(id || context.req.identity.id);
      return addresses;
    }
  },
  Mutation: {
    setDefaultAddress: withAuth(async (obj: any, { userId, id }: { id: number; userId: number }, context: any) => {
      try {
        const status = await context.Addresses.setDefaultAddress(userId || context.req.identity.id, id);
        if (status) {
          const address = await context.Addresses.address(id);
          address.isDefault = true;
          pubsub.publish(ADDRESSES_SUBSCRIPTION, {
            addressesUpdated: {
              mutation: 'DEFAULT_UPDATED',
              id: address.id,
              node: address
            }
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    }),
    addAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.req.identity.id;
        }
        const address = await context.Addresses.addAddress(input);
        pubsub.publish(ADDRESSES_SUBSCRIPTION, {
          addressesUpdated: {
            mutation: 'CREATED',
            id: address.id,
            node: address
          }
        });
        return true;
      } catch (e) {
        return e;
      }
    }),
    addOrEditAddress: withAuth(async (obj: any, { input }: AddressInput, context: any) => {
      const address = await context.Addresses.addOrEditAddress(input);
      pubsub.publish(ADDRESSES_SUBSCRIPTION, {
        addressesUpdated: {
          mutation: !input.id ? 'CREATED' : 'UPDATED',
          id: address.id,
          node: address
        }
      });
      return true;
    }),
    deleteAddress: withAuth(async (obj: any, { id }: Identifier, context: any) => {
      try {
        const address = await context.Addresses.address(id);
        await context.Addresses.deleteAddress(id);
        pubsub.publish(ADDRESSES_SUBSCRIPTION, {
          addressesUpdated: {
            mutation: 'DELETED',
            id: address.id,
            node: address
          }
        });
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    addressesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(ADDRESSES_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.userId) {
            return variables.userId <= payload.addressesUpdated.node.userId;
          } else {
            return true;
          }
        }
      )
    }
  }
});
