import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading, Button } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { Link } from 'react-router-dom';
// import { message } from 'antd';
import AdminGroupsComponent from './AdminGroupsComponent';
import GroupsFilterComponent from './GroupsFilterComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class AdminGroupsView extends React.Component {
  state = { flag: false };
  componentDidMount() {
    this.setState({ flag: true });
  }
  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.props.filter && (
          <>
            <Link to="/group/admin/new">
              <Button color="primary">{'Add New Group'}</Button>
            </Link>
            <br />
            <hr />
            <GroupsFilterComponent {...this.props} />
            <hr />
          </>
        )}
        {this.state.flag && !this.props.groupLoading ? <AdminGroupsComponent {...this.props} /> : <Loading />}
      </PageLayout>
    );
  }
}
AdminGroupsView.propTypes = {
  t: PropTypes.func,
  groupLoading: PropTypes.bool,
  filter: PropTypes.object
};

export default AdminGroupsView;
