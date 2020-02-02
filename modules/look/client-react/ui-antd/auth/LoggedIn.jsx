import React from 'react';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

const hasRole = (role, currentUser) => {
  return currentUser && (!role || (Array.isArray(role) ? role : [role]).indexOf(currentUser.role) >= 0) ? true : false;
};
const LoggedIn = ({ currentUser, role, children, elseComponent, refetchCurrentUser, ...restProps }) =>
  hasRole(role, currentUser)
    ? React.cloneElement(children, {
        ...restProps
      })
    : elseComponent || null;

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })
)(LoggedIn);
