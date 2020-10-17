import React, { useEffect } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';

import {
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withCanUserReview,
  withShareListingByEmail
} from './ListingOperations';

import ListingDetailView from '../components/ListingDetailView';
import { subscribeToListing, subscribeToListingReview } from './ListingSubscriptions';

const ListingDetail = props => {
  const {
    subscribeToMore,
    listing,
    history,
    location,
    shareListingByEmail,
    addOrRemoveListingBookmark,
    canUserReviewsubscribeToMore
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    const subscribeAddReview = subscribeToListingReview(canUserReviewsubscribeToMore, listing && listing.id);
    return () => {
      subscribe();
      subscribeAddReview();
    };
  }, [history, subscribeToMore, listing, location, canUserReviewsubscribeToMore]);

  const bookmarkListing = async (id, userId) => {
    try {
      await addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  const handleShare = async values => {
    try {
      await shareListingByEmail(values);
    } catch (e) {
      message.destroy();
      message.error('Message sending failed');
      throw new Error('Message sending failed', e);
    }
    message.destroy();
    message.success('Email sent!');
  };

  console.log('props', props);
  return <ListingDetailView onShare={handleShare} handleBookmark={bookmarkListing} {...props} />;
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  canUserReviewsubscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object,
  location: PropTypes.object,
  addOrRemoveListingBookmark: PropTypes.func,
  shareListingByEmail: PropTypes.func
};

export default compose(
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withCanUserReview,
  withShareListingByEmail
)(ListingDetail);
