import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import GroupFormMembersComponent from './GroupFormMembersComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class EditGroupMembersView extends React.Component {
  state = { flag: false };

  componentDidMount() {
    this.setState({ flag: true });
  }

  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? (
          <GroupFormMembersComponent {...this.props} cardTitle={'Edit Group Members'} />
        ) : (
          <Loading />
        )}
      </PageLayout>
    );
  }
}

EditGroupMembersView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func
};

export default EditGroupMembersView;
