import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withListings,
  withFilterUpdating,
  withListingsState,
  withOrderByUpdating,
  withListingsDeleting
} from './ListingOperations';
import { subscribeToListings } from './ListingSubscriptions';

const MyListingsContainer = props => {
  const { subscribeToMore, deleteListing, filter } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    return () => subscribe();
  });

  const handleDelete = async id => {
    try {
      await await deleteListing(id);
    } catch (e) {
      throw e;
    }
  };

  // console.log('props', props);
  return React.cloneElement(props.children, { ...props, onDelete: handleDelete });
};

MyListingsContainer.propTypes = {
  subscribeToMore: PropTypes.func,
  deleteListing: PropTypes.func,
  filter: PropTypes.object.isRequired,
  children: PropTypes.node
};
export default compose(
  withListingsState,
  withListings,
  withFilterUpdating,
  withOrderByUpdating,
  withListingsDeleting,
  translate('listing')
)(MyListingsContainer);
