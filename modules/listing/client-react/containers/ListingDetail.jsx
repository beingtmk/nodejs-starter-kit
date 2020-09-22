import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';

import {
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withListingBookmarkStatus
} from './ListingOperations';

import ListingDetailView from '../components/ListingDetailView';
import { subscribeToListing } from './withSubscriptions';

const ListingDetail = props => {
  const { subscribeToMore, listing, history } = props;

  useEffect(() => {
    const subscribe = subscribeToListing(subscribeToMore, listing && listing.id, history);
    return () => subscribe();
  });

  const bookmarkListing = async (id, userId) => {
    try {
      await props.addOrRemoveListingBookmark(id, userId);
    } catch (e) {
      throw Error(e);
    }
  };

  console.log('props', props);
  return <ListingDetailView {...props} handleBookmark={bookmarkListing} />;
};

ListingDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object,
  navigation: PropTypes.object,
  addOrRemoveListingBookmark: PropTypes.func
};

export default compose(
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withListingBookmarkStatus
)(ListingDetail);
