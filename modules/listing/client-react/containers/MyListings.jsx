import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react/translate';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

import MyListingsView from '../components/MyListingsView';

import { useListingListWithSubscription } from './withSubscriptions';
import { withMyListing, withListingsDeleting, updateMyListingsState } from './ListingOperations';

const MyListings = props => {
  const { updateQuery, subscribeToMore } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsState(listingsUpdated, updateQuery);
    }
  });
  console.log('props', props);
  return <MyListingsView {...props} />;
};

MyListings.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  }),
  withMyListing,
  withListingsDeleting,
  translate('listing')
)(MyListings);
