import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react/translate';

import MyListingsView from '../components/MyListingsView';

import { useListingListWithSubscription } from './withSubscriptions';
import { withCurrentUser, withMyListing, withListingsDeleting, updateMyListingsState } from './ListingOperations';

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

export default compose(withCurrentUser, withMyListing, withListingsDeleting, translate('listing'))(MyListings);
