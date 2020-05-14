import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react/translate';

// import LISTINGS_SUBSCRIPTION from '../graphql/ListingsSubscription.graphql';

import MyListingsView from '../components/MyListingsView';

import { useListingListWithSubscription } from './withSubscriptions';
import { withMyListing, withListingsDeleting, updateMyListingsState } from './ListingOperations';

const MyListings = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  const listingsUpdated = useListingListWithSubscription(subscribeToMore, filter);

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

export default compose(withMyListing, withListingsDeleting, translate('listing'))(MyListings);
