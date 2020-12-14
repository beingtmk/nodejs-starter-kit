import React, { useEffect } from 'react';
import { Message } from '@gqlapp/look-client-react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';

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
    canUserReviewsubscribeToMore,
    getCart,
    deleteOrderDetail
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    const subscribeAddReview = subscribeToListingReview(canUserReviewsubscribeToMore, listing && listing.id);
    const subscribeCart = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      () => subscribe();
      () => subscribeAddReview();
      () => subscribeCart();
    };
  }, [history, subscribeToMore, listing, location, canUserReviewsubscribeToMore, getCart]);

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
      Message.destroy();
      Message.error('Message sending failed');
      throw new Error('Message sending failed', e);
    }
    Message.destroy();
    Message.success('Email sent!');
  };
  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return (
    <ListingDetailView onDelete={handleDelete} onShare={handleShare} handleBookmark={bookmarkListing} {...props} />
  );
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  canUserReviewsubscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object,
  getCart: PropTypes.object,
  navigation: PropTypes.object,
  location: PropTypes.object,
  addOrRemoveListingBookmark: PropTypes.func,
  shareListingByEmail: PropTypes.func,
  deleteOrderDetail: PropTypes.func
};

export default compose(
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withCanUserReview,
  withShareListingByEmail,
  withGetCart,
  withDeleteCartItem,
  translate('listing')
)(ListingDetail);
