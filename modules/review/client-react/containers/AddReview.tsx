import React from 'react';
import { compose } from '@gqlapp/core-common';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';

import AddReviewView from '../components/AddReviewView.web';
import { withReviewAdding } from './ReviewOperations';

export interface AddReviewProps {
  t: TranslateFunction;
  loading: boolean;
  addReview: () => null;
}

const AddReview: React.FC<AddReviewProps> = props => {
  return <AddReviewView {...props} />;
};

export default compose(withReviewAdding, translate('review'))(AddReview);
