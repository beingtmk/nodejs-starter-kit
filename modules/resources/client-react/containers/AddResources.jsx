import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import AddResourcesView from '../components/AddResourcesView';

import ADD_RESOURCE from '../graphql/AddResource.graphql';

class Resources extends React.Component {
  render() {
    console.log('props', this.props);
    return <AddResourcesView {...this.props} />;
  }
}

export default compose(
  graphql(ADD_RESOURCE, {
    props: ({ ownProps: { history }, mutate }) => ({
      addResource: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addResource: {
                __typename: 'Resource',
                id: null,
                ...values
              }
            }
          });

          message.destroy();
          message.success('Resource added.');
          history.push('/resources');
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
      return { loading, currentUser };
    }
  }),
  translate('resources')
)(Resources);
