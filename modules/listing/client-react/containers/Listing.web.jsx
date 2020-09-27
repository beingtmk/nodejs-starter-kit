import React, { useEffect } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingView from '../components/ListingView';

import { subscribeToListings } from './withSubscriptions';
import {
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing
} from './ListingOperations';

const Listing = props => {
  const { subscribeToMore, editListing } = props;
  const filter = {};

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, props.filter);
    return () => subscribe();
  });

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

  console.log('props', props);
  return <ListingView onToggle={handleToggle} filter={filter} {...props} />;
};

Listing.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
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
