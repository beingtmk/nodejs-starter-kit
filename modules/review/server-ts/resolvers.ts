import { withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

import { Reviews, Identifier, ModalReview, DeleteModalReview } from './sql';

const REVIEW_SUBSCRIPTION = 'review_subscription';

interface Edges {
  cursor: number;
  node: Reviews & Identifier;
}
interface ModalReviewInput {
  input: ModalReview;
}
interface DeleteModalReviewInput {
  input: DeleteModalReview;
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
        return true;
      } catch (e) {
        return false;
      }
    }),
    editReview: withAuth(async (obj: any, { input }: ModalReviewInput, context: any) => {
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
    deleteReview: withAuth(async (obj: any, { input }: DeleteModalReviewInput, context: any) => {
      const review = await context.Review.review(input.reviewId);
      const isDeleted = await context.Review.deleteReview(input);
      if (isDeleted) {
        // console.log('called isDelete', review);
        pubsub.publish(REVIEW_SUBSCRIPTION, {
          reviewUpdated: {
            mutation: 'DELETED',
            node: review
          }
        });
        return true;
      } else {
        return false;
      }
    })
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
