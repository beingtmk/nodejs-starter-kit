import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withReview, withReviewEditing } from './ReviewOperations';

import EditReviewView from '../components/EditReviewView.web';
// import { useReviewWithSubscription } from './withSubscriptions';

const EditReview = props => {
  // console.log('props', props);
  return <EditReviewView {...props} />;
};

EditReview.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  review: PropTypes.object,
  history: PropTypes.object
};

export default compose(withReview, withReviewEditing, translate('review'))(EditReview);
