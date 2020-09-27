import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';


const FAQS_SUBSCRIPTION = 'faqs_subscription';


export default (pubsub: any) => ({
  Query: {
    async faqs(obj: any, { filter,  limit,   after, orderBy }: any, context: any) {
      var userId = null;
      const faqOutput = await context.Faq.faqs(limit, after, orderBy, filter);
      const { faqItems, total } = faqOutput;
      const hasNextPage = total > after + limit;
      const edgesArray = [];
      faqItems.map((faqItem, index) => {
        edgesArray.push({
          cursor: after + index,
          node: faqItem
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
    // async userFaqs(obj: any, { userId, filter,  limit,   after, orderBy }: any, context: any) {
    //   const faqOutput = await context.Faq.faqs(userId, limit, after, orderBy, filter);
    //   const { faqItems, total } = faqOutput;
    //   const hasNextPage = total > after + limit;
    //   const edgesArray = [];
    //   faqItems.map((faqItem, index) => {
    //     edgesArray.push({
    //       cursor: after + index,
    //       node: faqItem
    //     });
    //   });
    //   const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
    //   return {
    //     totalCount: total,
    //     edges: edgesArray,
    //     pageInfo: {
    //       endCursor,
    //       hasNextPage
    //     }
    //   };
    // },
    async faq(obj: any, { id }:any, { Faq }: any) {
      const faq = await Faq.faq(id);
      return faq;
    },
  },
  Mutation: {
    addFaq: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        var ga = await context.Faq.addFaq(input);
        const faq = await context.Faq.faq(ga.id);
        // publish for faqs list
        pubsub.publish(FAQS_SUBSCRIPTION, {
          faqsUpdated: {
            mutation: 'CREATED',
            node: faq
          }
        });
        return faq;
      } catch (e) {
        return e;
      }
    }),
    editFaq: withAuth(async (obj: any, { input }: any, context: any) => {
      try {
        await context.Faq.editFaq(input);
        const faq = await context.Faq.faq(input.id);
        // publish for edit faq page
        pubsub.publish(FAQS_SUBSCRIPTION, {
          faqsUpdated: {
            mutation: 'UPDATED',
            node: faq
          }
        });
        return faq;
      } catch (e) {
        return e;
      }
    }),
    deleteFaq: withAuth(async (obj: any, { id }: any, context: any) => {
      const faq = await context.Faq.faq(id);
      const isDeleted = await context.Faq.deleteFaq(id);
      if (isDeleted) {
        // publish for edit faq page
        pubsub.publish(FAQS_SUBSCRIPTION, {
          faqsUpdated: {
            mutation: 'DELETED',
            node: faq
          }
        });
        return faq;
      } else {
        return null;
      }
    }),

    async toggleFeaturedFaq(obj: any, { id }: any, context: any) {
      let faq = await context.Faq.faq(id);
      let status;
      if (!faq.isFeatured) {
        status = true;
      } else {
        status = false;
      }
      const isUpdated = await context.Faq.changeFeaturedStatus(id, status);
      if (isUpdated) {
        faq = await context.Faq.faq(id);
        pubsub.publish(FAQS_SUBSCRIPTION, {
          faqsUpdated: {
            mutation: 'UPDATED',
            node: faq
          }
        });
        return faq;
      } else {
        return null;
      }
    },
  },
  Subscription: {
    faqsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(FAQS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.faqsUpdated;
          const {
            filter: { isFeatured,  searchText,  }
          } = variables;
          const checkByFilter =
            !!node.isFeatured === isFeatured &&
            (!searchText ||
              node.title.toUpperCase().includes(searchText.toUpperCase()) );
          switch (mutation) {
            case 'DELETED':
              return true;
            case 'CREATED':
              return true;
            case 'UPDATED':
              return  true;
          }
        }
      )
    },
  }
});