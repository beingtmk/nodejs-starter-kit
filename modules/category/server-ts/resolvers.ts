import { CategoryInput, Identifier } from './sql';
import { withFilter } from 'graphql-subscriptions';

interface Edges {
  cursor: number;
  node: CategoryInput & Identifier;
}
export const CATEGORIES_SUBSCRIPTION = 'categories_subscription';
export default (pubsub: any) => ({
  Query: {
    async categories(obj: any, { limit, after, orderBy, filter }: any, { Category, req: { identity } }: any) {
      const edgesArray: Edges[] = [];
      const { total, categories } = await Category.categoriesPagination(limit, after, orderBy, filter);
      const hasNextPage = total > after + limit;

      categories.map((listing: CategoryInput & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: listing
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
    async category(obj: any, { id }: Identifier, { Category }: any) {
      return Category.category(id);
    }
  },
  Mutation: {
    async addCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      const res = await Category.addCategory(input);
      return true;
    },
    async editCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      return Category.editCategory(input);
    },
    async deleteCategory(obj: any, { id }: Identifier, { Category }: any) {
      return Category.deleteCategory(id);
    }
  },
  Subscription: {
    categoriesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(CATEGORIES_SUBSCRIPTION),
        (payload, variables) => {
          if (variables.endCursor) {
            return variables.endCursor <= payload.categoriesUpdated.id;
          } else {
            return true;
          }
        }
      )
    }
  }
});
