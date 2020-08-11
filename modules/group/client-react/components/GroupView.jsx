import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Loading } from '@gqlapp/look-client-react';
import GroupLayout from '@gqlapp/look-client-react/ui-antd/components/GroupLayout';
import settings from '@gqlapp/config';
import GroupComponent from './GroupComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class GroupView extends React.Component {
  state = { flag: false };

  componentDidMount() {
    this.setState({ flag: true });
  }

  render() {
    return (
      <GroupLayout>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.groupLoading ? <GroupComponent {...this.props} /> : <Loading />}
      </GroupLayout>
    );
  }
}

GroupView.propTypes = {
  groupLoading: PropTypes.bool,
  t: PropTypes.func
};

export default GroupView;
