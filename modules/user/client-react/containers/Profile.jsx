import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';

import ProfileView from '../components/ProfileView';

import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';

const Profile = props => {
  const { currentUser } = props;
  const { profile } = currentUser;
  
  console.log('profile View', currentUser);
  return <ProfileView {...props} />;
};

Profile.propTypes = {
  currentUser: PropTypes.object
  // shape({
  //   id: PropTypes.number,
  //   role: PropTypes.string,
  //   isActive: PropTypes.bool,
  //   createdAt: PropTypes.string,
  //   updatedAt: PropTypes.string,
  //   profile: PropTypes.shape({
  //     firstName: PropTypes.string,
  //     lastName: PropTypes.string
  //   })
  // })
};

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(Profile);
