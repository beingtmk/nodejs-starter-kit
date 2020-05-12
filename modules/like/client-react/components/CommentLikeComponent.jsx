import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip } from 'antd';
import { Loading } from '@gqlapp/look-client-react';

const BlogLikeComponent = ({
  currentUserLoading,
  currentUser,
  typeLikes,
  addLike,
  deleteLikeUser,
  LikeValues,
  likesLoading
}) => {
  const [likeFlag, setLikeFlag] = useState(false);

  useEffect(() => {
    setLikeFlag(typeLikes && currentUser ? typeLikes.find(item => item.user.id === currentUser.id) : false);
  }, [typeLikes, currentUser]);

  const likeFunc = async () => {
    try {
      likeFlag ? await deleteLikeUser(LikeValues) : await addLike(LikeValues);
    } catch (e) {
      throw e;
    }
    setLikeFlag(!likeFlag);
  };

  return !currentUserLoading && !likesLoading ? (
    <span key="comment-basic-like">
      {currentUser ? (
        <Tooltip title={likeFlag ? 'Unlike' : 'Like'}>
          <Icon type="like" theme={likeFlag ? 'filled' : 'outlined'} onClick={() => likeFunc()} />
        </Tooltip>
      ) : (
        <Tooltip title={'Login to like'}>
          <Icon type="like" theme={'outlined'} />
        </Tooltip>
      )}
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{typeLikes ? typeLikes.length : 0}</span>
    </span>
  ) : (
    <Loading />
  );
};

BlogLikeComponent.propTypes = {
  likesLoading: PropTypes.bool,
  currentUserLoading: PropTypes.bool,
  currentUser: PropTypes.object,
  typeLikes: PropTypes.array,
  addLike: PropTypes.func,
  deleteLikeUser: PropTypes.object,
  LikeValues: PropTypes.object
};

export default BlogLikeComponent;
