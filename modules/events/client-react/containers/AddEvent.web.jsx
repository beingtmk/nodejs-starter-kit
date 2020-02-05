import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import USERS_QUERY from '@gqlapp/user-client-react/graphql/UsersQuery.graphql';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import ADD_EVENT from '../graphql/AddEvent.graphql';

import AddEventView from '../components/AddEventView.web';

class AddEvent extends React.Component {
  render() {
    // console.log('props', this.props);
    return <AddEventView {...this.props} />;
  }
}

export default compose(
  graphql(ADD_EVENT, {
    props: ({ ownProps: { history }, mutate }) => ({
      addEvent: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addEvent: {
                __typename: 'Event',
                // id: null,
                ...values
              }
            }
          });

          message.destroy();
          message.success('Resource added.');
          history.push('/events');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  // graphql(USERS_QUERY, {
  //   options: ({ orderBy, filter }) => {
  //     return {
  //       fetchPolicy: 'network-only',
  //       variables: { orderBy, filter }
  //     };
  //   },
  //   props({
  //     data: { loading, users, refetch, error, updateQuery, subscribeToMore }
  //   }) {
  //     return {
  //       loading,
  //       users,
  //       refetch,
  //       subscribeToMore,
  //       updateQuery,
  //       errors: error ? error.graphQLErrors : null
  //     };
  //   }
  // }),
  translate('events')
)(AddEvent);
