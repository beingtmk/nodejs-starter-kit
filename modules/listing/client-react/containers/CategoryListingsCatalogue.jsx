import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Message } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';

import CategoryListingsCatalogueView from '../components/CategoryListingsCatalogueView';
import { subscribeToListings } from './ListingSubscriptions';
import {
  withListings,
  withFilterUpdating,
  withListingsState,
  withOrderByUpdating,
  withCurrentUser
} from './ListingOperations';
import ROUTES from '../routes';

const ListingsCatalogue = props => {
  const { subscribeToMore, filter, deleteOrderDetail, getCart } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    const subscribeCart = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      () => subscribe();
      () => subscribeCart();
    };
  });

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
    <CategoryListingsCatalogueView onDelete={handleDelete} emptyLink={`${ROUTES.add}`} {...props} showFilter={true} />
  );
};

ListingsCatalogue.propTypes = {
  subscribeToMore: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  getCart: PropTypes.object,
  filter: PropTypes.object
};

export default compose(
  withListingsState,
  withGetCart,
  withCurrentUser,
  withFilterUpdating,
  withOrderByUpdating,
  withListings,
  withDeleteCartItem,
  translate('listing')
)(ListingsCatalogue);
