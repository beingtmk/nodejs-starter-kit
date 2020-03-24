import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, LayoutCenter, New } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

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
        {t(`post.label.edit`)} {t('post.label.post')}
      </h2>
      <New length="110px" />
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
        {renderMetaData()}
        <div className="text-center">{t('post.loadMsg')}</div>
      </PageLayout>
    );
  } else {
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
