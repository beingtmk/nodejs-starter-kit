import React from 'react';
import { graphql } from 'react-apollo';
import { message } from 'antd';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import USER_LISTINGS from '../graphql/UserListingsQuery.graphql';

import UserListingsView from '../components/UserListingsView';

const UserListings = props => {
  console.log('props', props);
  return <UserListingsView {...props} />;
};

export default compose(
  graphql(USER_LISTINGS, {
    options: props => {
      return {
        variables: { userId: props.user && props.user.id }
      };
    },
    props({ data: { loading, error, userListings } }) {
      if (error) throw new Error(error);
      return { loading, userListings };
    }
  }),
  translate('listing')
)(UserListings);
