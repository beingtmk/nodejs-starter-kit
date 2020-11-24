import { CategoryInput, Identifier } from './sql';
import { withFilter } from 'graphql-subscriptions';

interface Edges {
  cursor: number;
  node: CategoryInput & Identifier;
}
export const CATEGORIES_SUBSCRIPTION = 'categories_subscription';
export const CATEGORY_SUBSCRIPTION = 'category_subscription';

export default (pubsub: any) => ({
  Query: {
    async categories(
      obj: any,
      { limit, after, orderBy, filter, childNode }: any,
      { Category, req: { identity } }: any
    ) {
      const edgesArray: Edges[] = [];
      const { total, categories } = await Category.categoriesPagination(limit, after, orderBy, filter, childNode);
      const hasNextPage = total > after + limit;
      categories.map((category: CategoryInput & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: category
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
    async category(obj: any, { id, childNode }: Identifier & { childNode: string }, { Category }: any) {
      return Category.category(id, childNode);
    }
  },
  Mutation: {
    async addCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      try {
        const id = await Category.addCategory(input);
        const category = await Category.category(id);
        pubsub.publish(CATEGORIES_SUBSCRIPTION, {
          categoriesUpdated: {
            mutation: 'CREATED',
            id,
            node: category
          }
        });
        return id;
      } catch (e) {
        return e;
      }
    },
    async editCategory(obj: any, { input }: { input: CategoryInput }, { Category }: any) {
      try {
        await Category.editCategory(input);
        const category = await Category.category(input.id);
        if (category) {
          pubsub.publish(CATEGORIES_SUBSCRIPTION, {
            categoriesUpdated: {
              mutation: 'UPDATED',
              id: input.id,
              node: category
            }
          });
          pubsub.publish(CATEGORY_SUBSCRIPTION, {
            categoryUpdated: {
              mutation: 'UPDATED',
              id: input.id,
              node: category
            }
          });
        }
        return true;
      } catch (e) {
        return e;
      }
    },
    async deleteCategory(obj: any, { id }: Identifier, { Category }: any) {
      const category = await Category.category(id);
      const isDeleted = Category.deleteCategory(id);

      if (isDeleted) {
        pubsub.publish(CATEGORIES_SUBSCRIPTION, {
          categoriesUpdated: {
            mutation: 'DELETED',
            id,
            node: category
          }
        });
        pubsub.publish(CATEGORY_SUBSCRIPTION, {
          categoryUpdated: {
            mutation: 'DELETED',
            id,
            node: category
          }
        });
        return true;
      } else {
        return false;
      }
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
    },
    categoryUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(CATEGORY_SUBSCRIPTION),
        (payload, variables) => {
          return payload.categoryUpdated.id === variables.id;
        }
      )
    }
  }
});
