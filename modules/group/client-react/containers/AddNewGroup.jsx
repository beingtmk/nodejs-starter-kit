import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { message } from 'antd';
import AddNewGroupView from '../components/AddNewGroupView';
import ADD_GROUP from '../graphql/AddGroup.graphql';
import { removeTypename } from '../constants';

class AddNewGroup extends React.Component {
  render() {
    return <AddNewGroupView onSubmit={this.props.addGroup} {...this.props} />;
  }
}

AddNewGroup.propTypes = {
  addGroup: PropTypes.func
};

export default compose(
  graphql(ADD_GROUP, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addGroup: async values => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          const {
            data: { addGroup }
          } = await mutate({
            variables: { input: removeTypename(values) }
          });

          message.destroy();
          message.success('Group added.');
          if (history) {
            return history.push('/group/' + addGroup.id, {
              group: addGroup
            });
          } else if (navigation) {
            return navigation.navigate('Group', {
              id: addGroup.id
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
)(translate('group')(AddNewGroup));
