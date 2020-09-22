import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import { useListingListWithSubscription } from './withSubscriptions';
import { withUserListing, withListingsDeleting, updateMyListingsState } from './ListingOperations';

import UserListingsView from '../components/UserListingsView';

const UserListings = props => {
  const { updateQuery, subscribeToMore } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <UserListingsView {...props} />;
};

UserListings.propTypes = {
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
  withUserListing,
  withListingsDeleting,
  translate('listing')
)(UserListings);
