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
  withReviewsDeleting
} from './ReviewOperations';
interface ReviewProps {
  t: TranslateFunction;
  subscribeToMore: () => null;
}

const Review: React.FC<ReviewProps> = props => {
  const { subscribeToMore, filter } = props;

  useEffect(() => {
    const subscribe = subscribeToReviews(subscribeToMore, filter);
    return () => subscribe();
  });

  const handleHelpful = async (id: number, helpful: number) => {
    try {
      const input = { id, helpful };
      await props.editReview(input);
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
  translate('review')
)(Review);
