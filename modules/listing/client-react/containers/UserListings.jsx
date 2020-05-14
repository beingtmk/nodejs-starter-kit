import React from 'react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withUserListing } from './ListingOperations';

import UserListingsView from '../components/UserListingsView';

const UserListings = props => {
  console.log('props', props);
  return <UserListingsView {...props} />;
};

export default compose(withUserListing, translate('listing'))(UserListings);
