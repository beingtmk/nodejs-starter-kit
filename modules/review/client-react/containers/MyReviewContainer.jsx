import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withReviews, withReviewsDeleting, subscribeToReviews } from './ReviewOperations';

const ReviewContainer = props => {
  const { subscribeToMore, filter } = props;

  useEffect(() => {
    const subscribe = subscribeToReviews(subscribeToMore, filter);
    return () => subscribe();
  });
  return React.cloneElement(props.children, { ...props });
};

ReviewContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
};
export default compose(withReviews, withReviewsDeleting, translate('review'))(ReviewContainer);
