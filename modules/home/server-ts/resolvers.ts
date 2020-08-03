import { DynamicCarouselInput, Identifier, FilterDynamicCarouselInput } from './sql';

export default (pubsub: any) => ({
  Query: {
    dynamicCarousels(obj: any, { filter }: FilterDynamicCarouselInput, { Home, req: { identity, t } }: any) {
      return Home.dynamicCarousels(filter);
    },
    dynamicCarousel(obj: any, { id }: Identifier, { Home, req: { identity, t } }: any) {
      return Home.dynamicCarousel(id);
    }
  },
  Mutation: {
    addDynamicCarousel(obj: any, { input }: DynamicCarouselInput, { Home, req: { identity, t } }: any) {
      const res = Home.addDynamicCarousel(input);
      if (res) {
        return true;
      } else {
        return false;
      }
    },
    editDynamicCarousel(obj: any, { input }: DynamicCarouselInput, { Home, req: { identity, t } }: any) {
      const res = Home.editDynamicCarousel(input);
      if (res) {
        return true;
      } else {
        return false;
      }
    },
    async deleteDynamicCarousel(obj: any, { id }: Identifier, { Home, req: { identity, t } }: any) {
      const res = await Home.deleteDynamicCarousel(id);
      if (res) {
        return true;
      } else {
        return false;
      }
    }
  },
  Subscription: {}
});
