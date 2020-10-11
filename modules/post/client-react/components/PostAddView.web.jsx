import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';

import PostForm from './PostForm';

const onSubmit = addPost => values => {
  addPost(values.title, values.content);
};

const PostAddView = ({ addPost, t }) => {
  const renderContent = () => (
    <>
      <MetaTags title={t('post.title')} description={t('post.meta')} />
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
