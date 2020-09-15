import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withListings, withListingsDeleting, updateMyListingsState } from './ListingOperations';
import { useListingListWithSubscription } from './withSubscriptions';

const MyListingsContainer = props => {
  const { updateQuery, subscribeToMore, deleteListing } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsState(listingsUpdated, updateQuery);
    }
  });

  const handleDelete = async id => {
    try {
      await await deleteListing(id);
    } catch (e) {
      throw e;
    }
  };

  console.log('props', props);
  return React.cloneElement(props.children, { ...props, onDelete: handleDelete });
};

MyListingsContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
};
export default compose(withListings, withListingsDeleting, translate('listing'))(MyListingsContainer);
