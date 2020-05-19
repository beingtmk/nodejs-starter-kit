import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { Spin } from 'antd';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingCatalogueView from '../components/ListingCatalogueView.web';

import { useMyListingBookmarkWithSubscription } from './withSubscriptions';
import { withCurrentUser, withMyListingsBookmark, updateMyListingsBookmarkState } from './ListingOperations';

const MyListingsBookmark = props => {
  const { updateQuery, subscribeToMore } = props;
  const listingsUpdated = useMyListingBookmarkWithSubscription(subscribeToMore);
  console.log('listingsUpdated', listingsUpdated);

  useEffect(() => {
    if (listingsUpdated) {
      updateMyListingsBookmarkState(listingsUpdated, updateQuery);
    }
  });

  console.log('props', props);
  return <ListingCatalogueView listings={props.myListingsBookmark} {...props} />;
};

MyListingsBookmark.propTypes = {
  subscribeToMore: PropTypes.func,
  myListingsBookmark: PropTypes.object,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(withCurrentUser, withMyListingsBookmark, translate('listing'))(MyListingsBookmark);
