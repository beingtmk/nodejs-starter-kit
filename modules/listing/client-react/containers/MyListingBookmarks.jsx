import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ListingCatalogueView from '../components/ListingCatalogueView.web';

import { withCurrentUser, withMyListingsBookmark } from './ListingOperations';
import { subscribeToListingsBookmark } from './ListingSubscriptions';
import ROUTES from '../routes';

const MyListingsBookmark = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToListingsBookmark(subscribeToMore);
    return () => subscribe();
  });

  // console.log('props', props);
  return (
    <ListingCatalogueView
      title={'My Bookmarks'}
      emptyLink={`${ROUTES.listingCatalogue}`}
      listings={props.myListingsBookmark}
      {...props}
    />
  );
};

MyListingsBookmark.propTypes = {
  subscribeToMore: PropTypes.func,
  myListingsBookmark: PropTypes.object,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(withCurrentUser, withMyListingsBookmark, translate('listing'))(MyListingsBookmark);
