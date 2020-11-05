import React from 'react';
import PropTypes from 'prop-types';

import ListingsByIdsCarousel from '@gqlapp/listing-client-react/components/ListingsByIdsCarousel';

const OnGoingDiscountsView = props => {
  const { t, ids = [], currentUser, currentUserLoading, history, cartLoading, onDelete, getCart } = props;

  return (
    <ListingsByIdsCarousel
      ids={ids}
      currentUser={currentUser}
      currentUserLoading={currentUserLoading}
      history={history}
      cartLoading={cartLoading}
      onDelete={onDelete}
      getCart={getCart}
      filter={{ isActive: true }}
      title={t('listingCarousel.latestAdditions')}
      style={{ backgroundColor: '#f7f7f7' }}
    />
  );
};

OnGoingDiscountsView.propTypes = {
  ids: PropTypes.array,
  t: PropTypes.func,
  currentUser: PropTypes.object,
  currentUserLoading: PropTypes.bool,
  history: PropTypes.object,
  cartLoading: PropTypes.bool,
  onDelete: PropTypes.func,
  getCart: PropTypes.object
};

export default OnGoingDiscountsView;
