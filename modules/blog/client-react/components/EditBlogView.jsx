import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { PageLayout, Loading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import BlogFormCmponent from './BlogFormCmponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const EditBlogView = props => {
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(true);
  }, []);
  return (
    <PageLayout>
      {renderMetaData(props.t)}
      {flag && !props.loading ? <BlogFormCmponent {...props} cardTitle={'Edit Blog'} /> : <Loading />}
    </PageLayout>
  );
};
EditBlogView.propTypes = {
  loading: PropTypes.bool,
  t: PropTypes.func
};

export default EditBlogView;
