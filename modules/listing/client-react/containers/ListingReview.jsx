import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { Message } from '@gqlapp/look-client-react';

import ListingReviewView from '../components/ListingReviewView';
import { withListing, withCanUserReview } from './ListingOperations';
import { subscribeToListing, subscribeToListingReview } from './ListingSubscriptions';

const ListingReview = props => {
  const {
    history,
    subscribeToMore,
    listing,
    location,
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

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  return <ListingReviewView onDelete={handleDelete} {...props} />;
};

ListingReview.propTypes = {
  history: PropTypes.object,
  subscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  location: PropTypes.object,
  canUserReviewsubscribeToMore: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  getCart: PropTypes.object
};

export default compose(
  withListing,
  withCanUserReview,
  withGetCart,
  withDeleteCartItem,
  translate('listing')
)(ListingReview);
