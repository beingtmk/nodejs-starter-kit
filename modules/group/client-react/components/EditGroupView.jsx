import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import GroupFormComponent from './GroupFormComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class EditGroupView extends React.Component {
  state = { flag: false };

  componentDidMount() {
    this.setState({ flag: true });
  }

  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? (
          <GroupFormComponent {...this.props} cardTitle={'Edit Group'} />
        ) : (
          <Loading />
        )}
      </PageLayout>
    );
  }
}

EditGroupView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func
};

export default EditGroupView;
