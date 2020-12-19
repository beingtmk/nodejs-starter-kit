import React from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';

import { withCurrentUser } from './ListingOperations';
import MyListingsView from '../components/MyListingsView';
import MyListingsContainer from './MyListingsContainer';

const MyListings = props => {
  const { currentUser } = props;

  return (
    <MyListingsContainer {...props} addFilter={{ userId: currentUser && currentUser.id }}>
      <MyListingsView />
    </MyListingsContainer>
  );
};

MyListings.propTypes = {
  currentUser: PropTypes.object,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  updateQuery: PropTypes.func
};

export default compose(withCurrentUser)(MyListings);
