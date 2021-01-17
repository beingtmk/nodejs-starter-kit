import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Icon, Button } from '@gqlapp/look-client-react';

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
      <Button shape="circle" color={'primary'} ghost onClick={handleClick}>
        {status && status ? (
          <Icon type="StarFilled" style={{ fontSize: '15px' }} />
        ) : (
          <Icon type="StarOutlined" style={{ fontSize: '15px' }} />
        )}
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
