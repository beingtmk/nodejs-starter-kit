import React, { useState, useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { withListingBookmarkStatus } from '../containers/ListingOperations';

const BookmarkStyle = styled.div`
  position: absolute;
  z-index: 1;
  right: 6%;
  top: 3%;
`;

const BookmarkComponent = props => {
  const { handleBookmark, listingBookmarkStatus } = props;
  const [status, setStatus] = useState(listingBookmarkStatus);

  useEffect(() => {
    setStatus(listingBookmarkStatus);
  }, [listingBookmarkStatus]);

  console.log('props', props, 'status', status);
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
        {status && status ? (
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
  listingBookmarkStatus: PropTypes.bool
};

export default compose(withListingBookmarkStatus)(BookmarkComponent);
