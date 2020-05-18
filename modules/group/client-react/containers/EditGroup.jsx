import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import EditGroupView from '../components/EditGroupView';
import EDIT_GROUP from '../graphql/UpdateGroup.graphql';
import GROUP_QUERY from '../graphql/GroupQuery.graphql';
import { removeTypename } from '../constants';

class EditGroup extends React.Component {
  render() {
    return <EditGroupView onSubmit={this.props.updateGroup} {...this.props} />;
  }
}

EditGroup.propTypes = {
  updateGroup: PropTypes.func
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
  graphql(EDIT_GROUP, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      updateGroup: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const {
            data: { updateGroup }
          } = await mutate({
            variables: { input: removeTypename(values) }
          });

          message.destroy();
          message.success('Success!');
          if (history) {
            return history.push('/group/' + updateGroup.id, {
              group: updateGroup
            });
          } else if (navigation) {
            return navigation.navigate('Group', {
              id: updateGroup.id
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
