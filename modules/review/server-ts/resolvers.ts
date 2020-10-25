import { withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

import { Reviews, Identifier, ModalReview } from './sql';
import { LISTING_REVIEW_SUBSCRIPTION } from '@gqlapp/listing-server-ts/resolvers';

const REVIEW_SUBSCRIPTION = 'review_subscription';

interface Edges {
  cursor: number;
  node: Reviews & Identifier;
}
interface ModalEditReviewInput {
  input: Reviews & Identifier;
}
interface ModalReviewInput {
  input: ModalReview;
}

export default (pubsub: any) => ({
  Query: {
    async review(obj: any, { id }: Identifier, context: any) {
      return context.Review.review(id);
    },
    async reviews(obj: any, { limit, after, orderBy, filter }: any, context: any) {
      const edgesArray: Edges[] = [];
      const { total, reviews } = await context.Review.reviews(limit, after, orderBy, filter);

      const hasNextPage = total > after + limit;

      reviews.map((review: Reviews & Identifier, index: number) => {
        edgesArray.push({
          cursor: after + index,
          node: review
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
    async ratingAverage(obj: any, { modalName, modalId }: { modalName: string; modalId: number }, context: any) {
      return context.Review.ratingAverage(modalName, modalId);
    },
    async reviewHelpfulStatus(obj: any, { reviewId, userId }: any, context: any) {
      if (context.req.identity && context.req.identity.id) {
        return context.Review.reviewHelpfulStatus(reviewId, userId || context.req.identity.id);
      } else {
        return false;
      }
    }
  },
  Mutation: {
    addReview: withAuth(async (obj: any, { input }: ModalReviewInput, context: any) => {
      // console.log('input form add', input);
      try {
        if (!input.review.userId) {
          input.review.userId = context.req.identity.id;
        }
        const id = await context.Review.addReview(input);
        const review = await context.Review.review(id);
        pubsub.publish(REVIEW_SUBSCRIPTION, {
          reviewUpdated: {
            mutation: 'CREATED',
            node: review
          }
        });
        pubsub.publish(LISTING_REVIEW_SUBSCRIPTION, {
          listingReview: {
            mutation: 'CREATED',
            id: input.modalId,
            node: false
          }
        });
        return true;
      } catch (e) {
        return false;
      }
    }),
    editReview: withAuth(async (obj: any, { input }: ModalEditReviewInput, context: any) => {
      try {
        const id = await context.Review.editReview(input);
        const review = await context.Review.review(id);
        pubsub.publish(REVIEW_SUBSCRIPTION, {
          reviewUpdated: {
            mutation: 'UPDATED',
            node: review
          }
        });
        return true;
      } catch (e) {
        return false;
      }
    }),
    deleteReview: withAuth(async (obj: any, { id }: { id: number }, context: any) => {
      const review = await context.Review.review(id);
      // console.log(review);
      const isDeleted = await context.Review.deleteReview(id);
      if (isDeleted) {
        // console.log('called isDelete', review);
        pubsub.publish(REVIEW_SUBSCRIPTION, {
          reviewUpdated: {
            mutation: 'DELETED',
            node: review
          }
        });
        pubsub.publish(LISTING_REVIEW_SUBSCRIPTION, {
          listingReview: {
            mutation: 'DELETED',
            id: review.modalReview.modalId,
            node: true
          }
        });
        return true;
      } else {
        return false;
      }
    }),
    refresh: async (obj: any, {}: object, context: any) => {
      await context.Review.refresh();
    },
    async addOrRemoveReviewHelpful(obj: any, { reviewId, userId }: any, context: any) {
      if (context.req.identity && context.req.identity.id) {
        const status = await context.Review.addOrRemoveReviewHelpful(reviewId, userId || context.req.identity.id);
        const review = await context.Review.review(reviewId);
        // console.log(review);
        if (status) {
          pubsub.publish(REVIEW_SUBSCRIPTION, {
            reviewUpdated: {
              mutation: 'UPDATED',
              node: review
            }
          });
          return 'Added SuccessFully';
        } else {
          pubsub.publish(REVIEW_SUBSCRIPTION, {
            reviewUpdated: {
              mutation: 'UPDATED',
              node: review
            }
          });
          return 'Removed SuccessFully';
        }
      } else {
        return false;
      }
    }
  },
  Subscription: {
    reviewUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(REVIEW_SUBSCRIPTION),
        (payload, variables) => {
          return payload.reviewUpdated.id === variables.id;
        }
      )
    }
  }
});
