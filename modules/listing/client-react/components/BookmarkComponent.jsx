import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

const BookmarkComponent = props => {
  const { handleBookmark, bookmarkStatus } = props;
  return (
    <Button shape="circle" onClick={handleBookmark}>
      {bookmarkStatus ? (
        <Icon type="star" theme="filled" style={{ fontSize: '15px' }} />
      ) : (
        <Icon type="star" style={{ fontSize: '15px' }} />
      )}
    </Button>
  );
};

BookmarkComponent.propTypes = {
  handleBookmark: PropTypes.func,
  bookmarkStatus: PropTypes.bool
};

export default BookmarkComponent;
