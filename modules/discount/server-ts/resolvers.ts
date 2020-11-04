import { Discount as Discounts, Identifier } from './sql';
import withAuth from 'graphql-auth';

interface Edges {
  cursor: number;
  node: Discounts & Identifier;
}

interface DiscountInput {
  input: Discounts;
}

interface DiscountInputWithId {
  input: Discounts & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async discounts(obj: any, { limit, after, orderBy, filter }: any, { Discount, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, discounts } = await Discount.discountsPagination(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      discounts.map((discount: Discounts & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: discount
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
    async discount(obj: any, { id }: Identifier, { Discount }: any) {
      return Discount.discount(id);
    },
    async modalDiscount(obj: any, { modalName, modalId }: { modalName: string; modalId: number }, { Discount }: any) {
      return Discount.modalDiscount(modalName, modalId);
    }
  },
  Mutation: {
    addDiscount: withAuth(async (obj: any, { input }: DiscountInput, context: any) => {
      try {
        const id = await context.Discount.addDiscount(input);
        // const discount = await context.Discount.discount(id);
        // // publish for discount list
        // pubsub.publish(DISCOUNTS_SUBSCRIPTION, {
        //   discountUpdated: {
        //     mutation: 'CREATED',
        //     id,
        //     node: discount
        //   }
        // });
        return true;
      } catch (e) {
        return e;
      }
    }),
    editDiscount: withAuth(async (obj: any, { input }: DiscountInputWithId, context: any) => {
      try {
        await context.Discount.editDiscount(input);
        // const discount = await context.Discount.discount(input.id);
        // // publish for discount list
        // pubsub.publish(DISCOUNT_SUBSCRIPTION, {
        //   listingsUpdated: {
        //     mutation: 'UPDATED',
        //     id: discount.id,
        //     node: discount
        //   }
        // });
        // // publish for edit discount page
        // pubsub.publish(DISCOUNT_SUBSCRIPTION, {
        //   listingUpdated: {
        //     mutation: 'UPDATED',
        //     id: discount.id,
        //     node: discount
        //   }
        // });
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
