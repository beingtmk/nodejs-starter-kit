import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading, Button } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import { Link } from 'react-router-dom';
// import { message } from 'antd';
import AdminBlogsComponent from './AdminBlogsComponent';
import BlogsFilterComponent from './BlogsFilterComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class AdminBlogsView extends React.Component {
  state = { flag: false };
  componentDidMount() {
    this.setState({ flag: true });
  }
  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.props.models && this.props.filter && (
          <>
            <Link to="/blog/new">
              <Button color="primary">{'Add New Blog'}</Button>
            </Link>
            <br />
            <hr />
            <BlogsFilterComponent {...this.props} />
            <hr />
          </>
        )}
        {this.state.flag && !this.props.blogLoading ? <AdminBlogsComponent {...this.props} /> : <Loading />}
      </PageLayout>
    );
  }
}
AdminBlogsView.propTypes = {
  t: PropTypes.func,
  blogLoading: PropTypes.bool,
  filter: PropTypes.object,
  models: PropTypes.array
};

export default AdminBlogsView;
