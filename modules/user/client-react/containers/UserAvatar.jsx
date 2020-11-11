import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Avatar, Icon } from '@gqlapp/look-client-react';

import CURRENT_USER_AVATAR_QUERY from '../graphql/CurrentUserQuery.graphql';

const UserAvatar = props => {
  const profile = !props.currentUserLoading && props.currentUser && props.currentUser.profile;

  return (
    <Avatar size={props.size} shape={props.shape} src={profile && profile.avatar} icon={<Icon type="UserOutlined" />} />
  );
};

UserAvatar.propTypes = {
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  size: PropTypes.number,
  shape: PropTypes.string
};

export default compose(
  graphql(CURRENT_USER_AVATAR_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
    }
  })
)(UserAvatar);
