import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import { Loading } from '@gqlapp/look-client-react';

const BlogLikeComponent = ({
  bookmarkLoading,
  currentUser,
  userBlogBookmark,
  addBlogBookmark,
  deleteBlogBookmark,
  blogId,
  currentUserLoading
}) => {
  let [likeFlag, setLikeFlag] = useState(false);

  likeFlag = userBlogBookmark ? true : false;
  const likeFunc = async () => {
    try {
      likeFlag ? await deleteBlogBookmark({ blogId }) : await addBlogBookmark({ blogId });
    } catch (e) {
      throw e;
    }
    setLikeFlag(!likeFlag);
  };

  return !currentUserLoading && !bookmarkLoading ? (
    <span>
      {currentUser ? (
        <Tooltip placement="bottomLeft" title={likeFlag ? 'Un-bookmark' : 'Bookmark this blog'}>
          <Icon
            onClick={() => likeFunc()}
            type="safety-certificate"
            theme={!likeFlag ? 'outlined' : 'filled'}
            style={{ fontSize: '22px', marginTop: '10px' }}
          />
        </Tooltip>
      ) : (
        <Tooltip placement="bottomLeft" title={'Login to bookmark the post'}>
          <Icon type="safety-certificate" theme={'outlined'} style={{ fontSize: '22px', marginTop: '10px' }} />
        </Tooltip>
      )}
    </span>
  ) : (
    <Loading />
  );
};

BlogLikeComponent.propTypes = {
  bookmarkLoading: PropTypes.bool,
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  userBlogBookmark: PropTypes.array,
  addBlogBookmark: PropTypes.func,
  deleteBlogBookmark: PropTypes.object,
  blogId: PropTypes.object
};

export default BlogLikeComponent;
