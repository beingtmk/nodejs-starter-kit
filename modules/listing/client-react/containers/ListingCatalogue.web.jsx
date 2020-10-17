import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';

import ListingCatalogueView from '../components/ListingCatalogueView.web';
import { subscribeToListings } from './ListingSubscriptions';
import {
  withListingsState,
  withFilterUpdating,
  withOrderByUpdating,
  withListings,
  withCurrentUser
} from './ListingOperations';

const ListingsCatalogue = props => {
  const { subscribeToMore, filter, deleteOrderDetail } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    return () => subscribe();
  });

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };
  console.log('props', props);
  return <ListingCatalogueView onDelete={handleDelete} {...props} showFilter={true} />;
};

ListingsCatalogue.propTypes = {
  subscribeToMore: PropTypes.func,
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
