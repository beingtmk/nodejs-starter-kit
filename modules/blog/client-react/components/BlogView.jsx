import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import BlogComponent from './BlogComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

class BlogView extends React.Component {
  state = { flag: false };
  componentDidMount() {
    this.setState({ flag: true });
  }
  render() {
    return (
      <PageLayout>
        {renderMetaData(this.props.t)}
        {this.state.flag && !this.props.loading ? <BlogComponent {...this.props} /> : <Loading />}
      </PageLayout>
    );
  }
}
BlogView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool
};

export default BlogView;
