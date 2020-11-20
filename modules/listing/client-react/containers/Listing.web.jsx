import React, { useEffect } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import ListingView from '../components/ListingView';

import { subscribeToListings } from './ListingSubscriptions';
import {
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing,
  withDulicateListing
} from './ListingOperations';

const Listing = props => {
  const { subscribeToMore, editListing, duplicateListing, history } = props;

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
  const handleDuplicate = async id => {
    try {
      const newListingId = await duplicateListing(id);
      if (newListingId) {
        history.push(`${ROUTES.editLink}${newListingId}`);
      }
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return (
    <ListingView
      onToggle={handleToggle}
      onDuplicate={handleDuplicate}
      filter={{ categoryFilter: {} }}
      orderBy={{}}
      {...props}
    />
  );
};

Listing.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  history: PropTypes.object,
  editListing: PropTypes.func,
  duplicateListing: PropTypes.func
};

export default compose(
  withListingsState,
  withListings,
  withListingsDeleting,
  withFilterUpdating,
  withOrderByUpdating,
  withEditListing,
  withDulicateListing,
  translate('listing')
)(Listing);
