import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingCatalogueView from '../components/ListingCatalogueView.web';
import { subscribeToListings } from './withSubscriptions';
import { withListingsState, withFilterUpdating, withListings, withCurrentUser } from './ListingOperations';

const ListingsCatalogue = props => {
  const { subscribeToMore, filter } = props;

  useEffect(() => {
    const subscribe = subscribeToListings(subscribeToMore, filter);
    return () => subscribe();
  });

  console.log('props', props);
  return <ListingCatalogueView {...props} showFilter={true} />;
};

ListingsCatalogue.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  withListingsState,
  withCurrentUser,
  withFilterUpdating,
  withListings,
  translate('listing')
)(ListingsCatalogue);
