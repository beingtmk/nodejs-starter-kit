import { withFilter } from 'graphql-subscriptions';
import { DynamicCarouselInput, Identifier, FilterDynamicCarouselInput, DynamicCarousels } from './sql';

const DYNAMIC_CAROUSEL_SUBSCRIPTION = 'dynamic_carousel_subscription';

interface Edges {
  cursor: number;
  node: DynamicCarousels & Identifier;
}
export default (pubsub: any) => ({
  Query: {
    async dynamicCarousels(
      obj: any,
      { limit, after, orderBy, filter }: FilterDynamicCarouselInput,
      { Home, req: { identity, t } }: any
    ) {
      const edgesArray: Edges[] = [];
      const { dynamicCarousels, total } = await Home.dynamicCarousels(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      dynamicCarousels.map((dynamicCarousel: DynamicCarousels & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: dynamicCarousel
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
    dynamicCarousel(obj: any, { id }: Identifier, { Home, req: { identity, t } }: any) {
      return Home.dynamicCarousel(id);
    }
  },
  Mutation: {
    async addDynamicCarousel(obj: any, { input }: DynamicCarouselInput, { Home, req: { identity, t } }: any) {
      const res = await Home.addDynamicCarousel(input);
      if (res) {
        const dCItem = await Home.dynamicCarousel(res.id);
        pubsub.publish(DYNAMIC_CAROUSEL_SUBSCRIPTION, {
          dynamicCarouselUpdated: {
            mutation: 'CREATED',
            node: dCItem
          }
        });
        return true;
      } else {
        return false;
      }
    },
    async editDynamicCarousel(obj: any, { input }: DynamicCarouselInput, { Home, req: { identity, t } }: any) {
      const res = await Home.editDynamicCarousel(input);
      if (res) {
        const dCItem = await Home.dynamicCarousel(res.id);
        pubsub.publish(DYNAMIC_CAROUSEL_SUBSCRIPTION, {
          dynamicCarouselUpdated: {
            mutation: 'UPDATED',
            node: dCItem
          }
        });
        return true;
      } else {
        return false;
      }
    },
    async deleteDynamicCarousel(obj: any, { id }: Identifier, { Home, req: { identity, t } }: any) {
      const dC = await Home.dynamicCarousel(id);
      const res = await Home.deleteDynamicCarousel(id);
      if (res) {
        pubsub.publish(DYNAMIC_CAROUSEL_SUBSCRIPTION, {
          dynamicCarouselUpdated: {
            mutation: 'DELETED',
            node: dC
          }
        });
        return true;
      } else {
        return false;
      }
    }
  },
  Subscription: {
    dynamicCarouselUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(DYNAMIC_CAROUSEL_SUBSCRIPTION),
        (payload, variables) => {
          return payload.dynamicCarouselUpdated.id === variables.id;
        }
      )
    }
  }
});
