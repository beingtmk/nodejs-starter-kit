import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import ReviewView from '../components/ReviewView';
import { withReviews, withReviewsDeleting } from './ReviewOperations';
interface ReviewProps {
  t: TranslateFunction;
}

const Review: React.FC<ReviewProps> = props => {
  console.log('props', props);
  return <ReviewView {...props} />;
};

export default compose(withReviews, withReviewsDeleting, translate('review'))(Review);
