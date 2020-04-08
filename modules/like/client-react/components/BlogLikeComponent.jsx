import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { Loading } from '@gqlapp/look-client-react';

const BlogLikeComponent = ({
  likesLoading,
  currentUser,
  typeLikes,
  addLike,
  deleteLikeUser,
  LikeValues,
  currentUserLoading
}) => {
  const [likeFlag, setLikeFlag] = useState(
    typeLikes && currentUser ? typeLikes.find(item => item.user.id === currentUser.id) : false
  );

  const likeFunc = async () => {
    likeFlag ? await deleteLikeUser(LikeValues) : await addLike(LikeValues);
    setLikeFlag(!likeFlag);
  };

  return !currentUserLoading && !likesLoading ? (
    <span>
      {currentUser ? (
        <Tooltip placement="bottomLeft" title={likeFlag ? 'Unlike' : 'Like'}>
          <Button
            type={likeFlag ? 'primary' : 'secondary'}
            shape="circle"
            icon="like"
            size="large"
            ghost={likeFlag ? true : false}
            onClick={() => likeFunc()}
            style={{ marginRight: '10px' }}
          />
        </Tooltip>
      ) : (
        <Tooltip placement="bottomLeft" title={'Login to like the post'}>
          <Button shape="circle" icon="like" size="large" disabled style={{ marginRight: '10px' }} />
        </Tooltip>
      )}
      <strong>{`${typeLikes ? typeLikes.length : 0}`}</strong>
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
