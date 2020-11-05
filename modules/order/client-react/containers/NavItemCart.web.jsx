import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';
import { Icon, Badge } from '@gqlapp/look-client-react';

import { withCurrentUser, withGetCart } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';

const NavItemCart = props => {
  const { getCart, subscribeToMore, history, currentUserLoading } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  // console.log('props navCart', props);
  return (
    <>
      {!currentUserLoading && (
        <>
          <Icon type="ShoppingCartOutlined" /> Cart{' '}
          <Badge style={{ marginTop: '-5px' }} count={getCart && getCart.orderDetails && getCart.orderDetails.length} />
        </>
      )}
    </>
  );
};

NavItemCart.propTypes = {
  currentUserLoading: PropTypes.bool.isRequired,
  getCart: PropTypes.object,
  history: PropTypes.object,
  subscribeToMore: PropTypes.func
};

export default compose(withCurrentUser, withGetCart, translate('order'))(NavItemCart);
