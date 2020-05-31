import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

const BookmarkStyle = styled.div`
  position: absolute;
  z-index: 1;
  right: 6%;
  top: 3%;
`;

const BookmarkComponent = props => {
  const { handleBookmark, bookmarkStatus } = props;
  const [status, setStatus] = useState(bookmarkStatus);

  const handleClick = () => {
    try {
      handleBookmark();
      setStatus(!status);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <BookmarkStyle>
      <Button shape="circle" onClick={handleClick}>
        {status ? (
          <Icon type="star" theme="filled" style={{ fontSize: '15px' }} />
        ) : (
          <Icon type="star" style={{ fontSize: '15px' }} />
        )}
      </Button>
    </BookmarkStyle>
  );
};

BookmarkComponent.propTypes = {
  handleBookmark: PropTypes.func,
  bookmarkStatus: PropTypes.bool
};

export default BookmarkComponent;
