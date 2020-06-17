import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import BlogBookmarksComponent from './BlogBookmarksComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const BlogBookmarksView = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      {flag && !props.bookmarkLoading ? <BlogBookmarksComponent {...props} /> : <Loading />}
    </PageLayout>
  );
};
BlogBookmarksView.propTypes = {
  t: PropTypes.func,
  bookmarkLoading: PropTypes.bool
};

export default BlogBookmarksView;
