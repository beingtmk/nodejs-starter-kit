import React, { useEffect } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingView from '../components/ListingView';

import { useListingsWithSubscription } from './withSubscriptions';
import {
  withListingsState,
  withListings,
  withListingsDeleting,
  updateListingsState,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing
} from './ListingOperations';

const Listing = props => {
  const { updateQuery, subscribeToMore, filter, editListing } = props;
  const listingsUpdated = useListingsWithSubscription(subscribeToMore, filter);

  const handleToggle = (field, value, id) => {
    const input = {};
    input.id = id;
    _.set(input, field, value);
    try {
      editListing(input);
    } catch (e) {
      throw Error(e);
    }
  };

  useEffect(() => {
    if (listingsUpdated) {
      updateListingsState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <ListingView {...props} onToggle={handleToggle} />;
};

Listing.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func,
  editListing: PropTypes.func
};

export default compose(
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing,
  translate('listing')
)(Listing);
