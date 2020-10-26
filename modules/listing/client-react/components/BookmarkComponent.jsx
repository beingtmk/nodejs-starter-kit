import React, { useState, useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { withListingBookmarkStatus } from '../containers/ListingOperations';

const BookmarkStyle = styled.div`
  position: absolute;
  right: ${props => (props.right ? props.right : '6%')};
  top: 3%;
  z-index: 1;
`;

const BookmarkComponent = props => {
  const { handleBookmark, listingBookmarkStatus, right } = props;
  const [status, setStatus] = useState(listingBookmarkStatus);

  useEffect(() => {
    setStatus(listingBookmarkStatus);
  }, [listingBookmarkStatus]);

  // console.log('props', props, 'status', status);
  const handleClick = () => {
    try {
      handleBookmark();
      setStatus(!status);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <BookmarkStyle right={right}>
      <Button shape="circle" type={'primary'} ghost onClick={handleClick}>
        {status && status ? <StarFilled style={{ fontSize: '15px' }} /> : <StarOutlined style={{ fontSize: '15px' }} />}
      </Button>
    </BookmarkStyle>
  );
};

BookmarkComponent.propTypes = {
  handleBookmark: PropTypes.func,
  listingBookmarkStatus: PropTypes.bool,
  right: PropTypes.string
};

export default compose(withListingBookmarkStatus)(BookmarkComponent);
