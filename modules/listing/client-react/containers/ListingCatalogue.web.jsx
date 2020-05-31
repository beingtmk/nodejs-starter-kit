import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingCatalogueView from '../components/ListingCatalogueView.web';
import { useListingsWithSubscription } from './withSubscriptions';
import { withListings, updateListingsState, withCurrentUser } from './ListingOperations';

const ListingsCatalogue = props => {
  const { updateQuery, subscribeToMore, filter } = props;
  const listingsUpdated = useListingsWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (listingsUpdated) {
      updateListingsState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <ListingCatalogueView {...props} />;
};

ListingsCatalogue.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(withCurrentUser, withListings, translate('listing'))(ListingsCatalogue);
