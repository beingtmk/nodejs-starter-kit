import React, { useEffect } from 'react';
import { message } from 'antd';
import { PropTypes } from 'prop-types';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withReview, withReviewEditing, subscribeToReview } from './ReviewOperations';

import EditReviewView from '../components/EditReviewView.web';
import ROUTES from '../routes';

const EditReview = props => {
  const { subscribeToMore, history } = props;

  useEffect(() => {
    const subscribe = subscribeToReview(subscribeToMore, history);
    return () => subscribe();
  });

  const onSubmit = async values => {
    message.destroy();
    message.loading('Please wait...', 0);
    try {
      values = removeTypename(values);
      const input = {
        id: values.id,
        userId: values.userId,
        rating: values.rating,
        feedback: values.feedback,
        isActive: values.isActive
        // input.reviewImages = Object.values(input.reviewImages);
      };
      await props.editReview(input);
    } catch (e) {
      message.destroy();
      message.error("Couldn't perform the action");
      console.error(e);
    }
    message.destroy();
    message.success('Changes Saved.');
    if (props.history) {
      return props.history.push(ROUTES.adminPanel);
    }
    // if (navigation) {
    //   if (role === 'admin') return navigation.navigate('ListingCatalogue');
    //   else return navigation.navigate('MyReviews');
    // }
  };
  // console.log('props', props);
  return <EditReviewView {...props} onSubmit={onSubmit} />;
};

EditReview.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  editReview: PropTypes.func,
  review: PropTypes.object,
  history: PropTypes.object
};

export default compose(withReview, withReviewEditing, translate('review'))(EditReview);
