import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from '@gqlapp/core-common';
import { withFilterUpdating, withUsersState, withUserList } from './UserOperations';

import UsersProfileCatalogueView from '../components/UsersProfileCatalogueView';

const UsersProfileCatalogue = props => {
  // console.log('props', props);
  return <UsersProfileCatalogueView {...props} />;
};

UsersProfileCatalogue.propTypes = {
  loading: PropTypes.bool.isRequired,
  profileList: PropTypes.object,
  subscribeToMore: PropTypes.func.isRequired,
  filter: PropTypes.object
};

export default compose(withFilterUpdating, withUsersState, withUserList)(UsersProfileCatalogue);
