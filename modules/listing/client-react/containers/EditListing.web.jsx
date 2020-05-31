import React, { useEffect } from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import { withListing, withCurrentUser, withEditListing, updateListingState } from './ListingOperations';

import EditListingView from '../components/EditListingView.web';
import { useListingWithSubscription } from './withSubscriptions';

const EditListing = props => {
  const { updateQuery, subscribeToMore, listing, history } = props;
  const listingsUpdated = useListingWithSubscription(subscribeToMore, listing && listing.id);
  console.log('object', listingsUpdated);

  useEffect(() => {
    if (listingsUpdated) {
      updateListingState(listingsUpdated, updateQuery, history);
    }
  });
  console.log('props', props);
  return <EditListingView {...props} />;
};

EditListing.propTypes = {
  updateQuery: PropTypes.func,
  subscribeToMore: PropTypes.func,
  listing: PropTypes.object,
  history: PropTypes.object
};

export default compose(withCurrentUser, withListing, withEditListing, translate('listing'))(EditListing);
