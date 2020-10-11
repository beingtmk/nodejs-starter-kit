import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { MetaTags, PageLayout, Underline } from '@gqlapp/look-client-react';

import PostForm from './PostForm';
import PostComments from '../containers/PostComments';

const onSubmit = (post, editPost) => values => {
  editPost(post.id, values.title, values.content);
};

const PostEditView = ({ loading, post, match, location, subscribeToMore, editPost, t }) => {
  let postObj = post;
  // if new post was just added read it from router
  if (!postObj && location.state) {
    postObj = location.state.post;
  }

  const renderContent = () => (
    <>
      <Link to="/posts">{t('post.btn.back')}</Link>
      <Underline>
        <h2>
          {t(`post.label.edit`)} {t('post.label.post')}
        </h2>
      </Underline>
      <PostForm onSubmit={onSubmit(postObj, editPost)} post={post} />
      <br />
      {postObj && (
        <PostComments postId={Number(match.params.id)} comments={postObj.comments} subscribeToMore={subscribeToMore} />
      )}
    </>
  );

  if (loading && !postObj) {
    return (
      <PageLayout>
        <MetaTags title={t('post.title')} description={t('post.meta')} />
        <div className="text-center">{t('post.loadMsg')}</div>
      </PageLayout>
    );
  } else {
    return <PageLayout>{renderContent()}</PageLayout>;
  }
};

PostEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  editPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default translate('post')(PostEditView);
