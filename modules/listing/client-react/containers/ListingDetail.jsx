import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import USER_QUERY from '@gqlapp/user-client-react/graphql/UserQuery.graphql';

import {
  withListing,
  withCurrentUser,
  withToogleListingBookmark,
  withListingBookmarkStatus,
  updateListingState
} from './ListingOperations';

import ListingDetailView from '../components/ListingDetailView';
import { useListingWithSubscription } from './withSubscriptions';

const ListingDetail = props => {
  const { updateQuery, subscribeToMore, listing, history } = props;
  const listingsUpdated = useListingWithSubscription(subscribeToMore, listing && listing.id);

  useEffect(() => {
    if (listingsUpdated) {
      updateListingState(listingsUpdated, updateQuery, history);
    }
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
  withListingBookmarkStatus,
  withToogleListingBookmark,
  graphql(USER_QUERY, {
    options: props => {
      let id = 0;
      id = props.listing ? props.listing.userId : id;
      return {
        variables: { id: id }
      };
    },
    props({ data: { loading, error, user } }) {
      if (error) throw new Error(error);
      return { loading, user };
    }
  })
)(ListingDetail);
