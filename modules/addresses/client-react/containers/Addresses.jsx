import React from 'react';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADDRESSES_QUERY from '../graphql/AddressesQuery.graphql';

import AddressesView from '../components/AddressesView';

// const addresses = [
//   {
//     id: 1,
//     streetAddress1: 'Devgiri boys hostel',
//     streetAddress2: 'Sinhgad central library',
//     city: 'Pune',
//     state: 'Maharashtra',
//     pinCode: 411041
//   },
//   {
//     id: 2,
//     streetAddress1: 'Devgiri boys hostel',
//     streetAddress2: 'Sinhgad central library',
//     city: 'Pune',
//     state: 'Maharashtra',
//     pinCode: 411041
//   }
// ];

class Addresses extends React.Component {
  render() {
    console.log('props', this.props);
    return <AddressesView {...this.props} />;
  }
}

export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      console.log('1');
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  graphql(ADDRESSES_QUERY, {
    options: props => {
      return { variables: { id: props.currentUser && props.currentUser.id } };
    },
    props({ data: { loading, error, addresses } }) {
      if (error) throw new Error(error);
      return { loading, addresses };
    }
  }),
  translate('addresses')
)(Addresses);
