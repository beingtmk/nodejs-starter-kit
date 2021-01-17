import React from 'react';
import PropTypes from 'prop-types';

import { ListingCarousel } from '@gqlapp/listing-client-react';

const DiscountsCarouselView = props => {
  const { title, ids = [], currentUser, currentUserLoading, history, cartLoading, onDelete, getCart, style } = props;

  return ids.length > 0 ? (
    <ListingCarousel
      ids={ids}
      currentUser={currentUser}
      currentUserLoading={currentUserLoading}
      history={history}
      cartLoading={cartLoading}
      onDelete={onDelete}
      getCart={getCart}
      filter={{ isActive: true }}
      title={title}
      style={style}
    />
  ) : null;
};

DiscountsCarouselView.propTypes = {
  ids: PropTypes.array,
  title: PropTypes.string,
  currentUser: PropTypes.object,
  currentUserLoading: PropTypes.bool,
  history: PropTypes.object,
  cartLoading: PropTypes.bool,
  onDelete: PropTypes.func,
  getCart: PropTypes.object,
  style: PropTypes.object
};

export default DiscountsCarouselView;
