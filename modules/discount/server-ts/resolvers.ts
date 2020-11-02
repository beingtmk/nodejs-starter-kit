import { Discount as Discounts, Identifier } from './sql';

interface Edges {
  cursor: number;
  node: Discounts & Identifier;
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
    }
  },
  Mutation: {},
  Subscription: {}
});
