import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import EditGroupMembersView from '../components/EditGroupMembersView';
import UPSERT_GROUP from '../graphql/UpsertGroup.graphql';
import GROUP_QUERY from '../graphql/GroupQuery.graphql';
import { removeTypename } from '../constants';

class EditGroup extends React.Component {
  render() {
    return <EditGroupMembersView onSubmit={this.props.upsertGroup} {...this.props} />;
  }
}

EditGroup.propTypes = {
  upsertGroup: PropTypes.func
};

export default compose(
  graphql(GROUP_QUERY, {
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
    props({ data: { loading, error, group } }) {
      if (error) throw new Error(error);
      return { groupLoading: loading, group };
    }
  }),
  graphql(UPSERT_GROUP, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      upsertGroup: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const {
            data: { upsertGroup }
          } = await mutate({
            variables: { input: removeTypename(values) }
          });

          message.destroy();
          message.success('Success!');
          if (history) {
            return history.push('/group/' + upsertGroup.id, {
              group: upsertGroup
            });
          } else if (navigation) {
            return navigation.navigate('Group', {
              id: upsertGroup.id
            });
          }
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })
)(translate('group')(EditGroup));
