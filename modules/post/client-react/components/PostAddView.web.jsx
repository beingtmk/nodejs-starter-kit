import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import PostForm from './PostForm';

const onSubmit = addPost => values => {
  addPost(values.title, values.content);
};

const PostAddView = ({ addPost, t }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('post.title')}`}
      meta={[
        {
          name: 'description',
          content: t('post.meta')
        }
      ]}
    />
  );

  const renderContent = () => (
    <>
      <Link to="/posts">{t('post.btn.back')}</Link>
      <h2>
        {t(`post.label.create`)} {t('post.label.post')}
      </h2>
      <PostForm onSubmit={onSubmit(addPost)} />
      <br />
    </>
  );
  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData()}
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

PostAddView.propTypes = {
  addPost: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('post')(PostAddView);
