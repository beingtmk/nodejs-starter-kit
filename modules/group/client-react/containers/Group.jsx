import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
import GroupView from '../components/GroupView';
import GROUP_QUERY from '../graphql/GroupQuery.graphql';

class Group extends React.Component {
  render() {
    return <GroupView {...this.props} />;
  }
}

Group.propTypes = {
  match: PropTypes.object
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
  })
)(translate('blog')(Group));
