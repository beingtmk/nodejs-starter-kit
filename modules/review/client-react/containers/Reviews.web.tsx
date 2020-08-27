import React, { useEffect } from 'react';
import { QueryControls } from 'react-apollo';
import { compose, PLATFORM, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewsView from '../components/ReviewsView';

import REVIEWS_QUERY from '../graphql/ReviewsQuery.graphql';
import DELETE_REVIEW from '../graphql/DeleteReview.graphql';

// import { useReviewsWithSubscription } from './withSubscriptions';
// import { withReviews, withReviewsDeleting, updateReviewsState, withToogleReviewActive } from './ReviewOperations';

import settings from '../../../../settings';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

export interface Reviews {
  totalCount: number;
  edges: [ReviewEdges];
  pageInfo: ReviewPageInfo;
}
interface ReviewPageInfo {
  endCursor: number;
  hasNextPage: boolean;
}
interface ReviewEdges {
  node: Review;
  cursor: number;
}
export interface Review {
  id: number;
  user: {
    id: number;
    username: string;
  };
  rating: string;
  feedback: string;
  isActive: boolean;
  // reviewImages: [ReviewImage]
  createdAt: string;
  updatedAt: string;
}

export interface ReviewProps {
  subscribeToMore: () => object;
  updateQuery: () => object;
  t: TranslateFunction;
  filter: object;
}

const Review: React.SFC<ReviewProps> = props => {
  // const { updateQuery, subscribeToMore, filter } = props;
  // const reviewsUpdated = useReviewsWithSubscription(subscribeToMore, filter);

  // useEffect(() => {
  //   if (reviewsUpdated) {
  //     updateReviewsState(reviewsUpdated, updateQuery);
  //   }
  // });
  // console.log('props', props);
  return <ReviewsView {...props} />;
};

export interface DeleteReview {
  modalId: number;
  reviewId: number;
  modal: string;
}

export default compose(
  graphql(REVIEWS_QUERY, {
    options: ({ orderBy, filter }: { orderBy: string; filter: object }) => {
      return {
        variables: {
          limit,
          after: 0,
          orderBy,
          filter
        },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, reviews, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after: number, dataDelivery: string) => {
        return fetchMore({
          variables: {
            after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.reviews.totalCount;
            const newEdges = fetchMoreResult.reviews.edges;
            const pageInfo = fetchMoreResult.reviews.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.reviews.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              reviews: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Review'
              }
            };
          }
        });
      };
      if (error) {
        throw new Error(error);
      }
      return { loading, reviews, subscribeToMore, loadData, updateQuery };
    }
  }),
  graphql(DELETE_REVIEW, {
    props: ({ mutate }) => ({
      deleteReview: (input: DeleteReview) => {
        mutate({
          variables: { input },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteReview: {
              input,
              __typename: 'Review'
            }
          }
          //   ,
          //   update: (cache, { data: { deleteReview } }) => {
          //     // Get previous reviews from cache
          //     const prevReviews = cache.readQuery({
          //       query: REVIEWS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       }
          //     });

          //     const newListReviews = onDeleteListing(prevReviews, deleteListing.id);

          //     // Write reviews to cache
          //     cache.writeQuery({
          //       query: REVIEWS_QUERY,
          //       variables: {
          //         limit,
          //         after: 0
          //       },
          //       data: {
          //         reviews: {
          //           ...newListReviews.reviews,
          //           __typename: 'Reviews'
          //         }
          //       }
          //     });
          //   }
        });
        message.warning('Review deleted.');
      }
    })
  }),
  translate('Review')
)(Review);
