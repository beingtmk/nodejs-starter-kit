import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewView from '../components/ReviewView';
import {
  withRating,
  subscribeToReviews,
  withReviews,
  withReviewAdding,
  withReviewEditing,
  withReviewsDeleting,
  withToogleReviewHelpful
} from './ReviewOperations';
interface ReviewProps {
  t: TranslateFunction;
  filter: {
    isActive: boolean;
    modalId: number;
    modalName: string;
  };
  showAdd: boolean;
  subscribeToMore: () => null;
  addOrRemoveReviewHelpful: (reviewId: number, userId: number) => null;
}

const Review: React.FC<ReviewProps> = props => {
  const { subscribeToMore, filter, addOrRemoveReviewHelpful } = props;

  useEffect(() => {
    const subscribe = subscribeToReviews(subscribeToMore, filter);
    return () => subscribe();
  });

  const handleHelpful = async (reviewId: number, userId: number) => {
    try {
      await addOrRemoveReviewHelpful(reviewId, userId);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <ReviewView {...props} handleHelpful={handleHelpful} />;
};

export default compose(
  withRating,
  withReviews,
  withReviewAdding,
  withReviewEditing,
  withReviewsDeleting,
  withToogleReviewHelpful,
  translate('review')
)(Review);
