import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Heading } from '@gqlapp/look-client-react';
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
      {renderMetaData()}
      <Link to="/posts">{t('post.btn.back')}</Link>
      <Heading type="2">
        {t(`post.label.create`)} {t('post.label.post')}
      </Heading>
      <PostForm onSubmit={onSubmit(addPost)} />
      <br />
    </>
  );
  return <PageLayout>{renderContent()}</PageLayout>;
};

PostAddView.propTypes = {
  addPost: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('post')(PostAddView);
