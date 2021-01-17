import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewsView from '../components/ReviewsView';
import {
  withReviewsStateQuery,
  withReviewsOrderByUpdating,
  withUpdateReviewsFilter,
  withReviews,
  withReviewsDeleting,
  subscribeToReviews
} from './ReviewOperations';

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
  reviewMedia: ReviewMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewMedia {
  id: number;
  url: string;
  type: string;
}

export interface ReviewProps {
  subscribeToMore: () => object;
  updateQuery: () => object;
  t: TranslateFunction;
  filter: object;
}

const Review: React.FC<ReviewProps> = props => {
  const { subscribeToMore } = props;
  const filter = {};

  useEffect(() => {
    const subscribe = subscribeToReviews(subscribeToMore, props.filter);
    return () => subscribe();
  });

  // console.log('props', props);
  return <ReviewsView filter={filter} {...props} />;
};

export default compose(
  withReviewsStateQuery,
  withReviewsOrderByUpdating,
  withUpdateReviewsFilter,
  withReviews,
  withReviewsDeleting,
  translate('Review')
)(Review);
