import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewView from '../components/ReviewView';
import { withRating, withReviews, withReviewEditing, withReviewsDeleting } from './ReviewOperations';
interface ReviewProps {
  t: TranslateFunction;
}

const Review: React.FC<ReviewProps> = props => {
  const handleHelpful = async (id: number, helpful: number) => {
    try {
      const input = { id, helpful };
      // console.log('input', input);
      await props.editReview(input);
    } catch (e) {
      throw Error(e);
    }
  };
  console.log('props', props);
  // return <h1>hello</h1>;
  return props.ratingAverage ? <ReviewView {...props} handleHelpful={handleHelpful} /> : null;
};

export default compose(withRating, withReviews, withReviewEditing, withReviewsDeleting, translate('review'))(Review);
