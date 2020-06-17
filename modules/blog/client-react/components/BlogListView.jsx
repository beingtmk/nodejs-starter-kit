import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
// import { message } from 'antd';
import BlogListComponent from './BlogListComponent';
import BlogsFilterComponent from './BlogsFilterComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class BlogListView extends React.Component {
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
            <hr />
            <BlogsFilterComponent {...this.props} />
            <hr />
          </>
        )}
        {this.state.flag && !this.props.blogLoading ? <BlogListComponent {...this.props} /> : <Loading />}
      </PageLayout>
    );
  }
}

BlogListView.propTypes = {
  t: PropTypes.func,
  blogLoading: PropTypes.bool,
  filter: PropTypes.object,
  models: PropTypes.array
};

export default BlogListView;
