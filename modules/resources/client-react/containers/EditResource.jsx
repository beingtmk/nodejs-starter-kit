import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose, removeTypename } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import EditResourceView from '../components/EditResourceView';

import RESOURCE_QUERY from '../graphql/ResourceQuery.graphql';
import EDIT_RESOURCE from '../graphql/EditResource.graphql';

class Resources extends React.Component {
  render() {
    console.log('props', this.props);
    return <EditResourceView {...this.props} />;
  }
}

export default compose(
  graphql(RESOURCE_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }

      return {
        variables: { id: Number(id) }
      };
    },
    props({ data: { loading, error, resource, subscribeToMore } }) {
      if (error) throw new Error(error);
      return { loading, resource, subscribeToMore };
    }
  }),
  graphql(EDIT_RESOURCE, {
    props: ({ ownProps: { history }, mutate }) => ({
      editResource: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const input = removeTypename(values);
          // removeTypename converts array into object which should not happen so we do the below to convert it back.
          input.resource = Object.values(input.resource);
          await mutate({
            variables: {
              input: input
            }
          });
          message.destroy();
          message.success('Changes Saved.');
          return history.push('/resources');
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  }),
  translate('resources')
)(Resources);
