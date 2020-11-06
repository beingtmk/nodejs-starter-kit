import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Message } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { withGetCart, withDeleteCartItem } from '@gqlapp/order-client-react/containers/OrderOperations';
import { subscribeToCart } from '@gqlapp/order-client-react/containers/OrderSubscriptions';

import HomeView4 from '../components/HomeView4';

const Home4 = props => {
  const { subscribeToMore, deleteOrderDetail, getCart } = props;

  useEffect(() => {
    const subscribeCart = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => subscribeCart();
  });

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <HomeView4 onDelete={handleDelete} {...props} />;
};

Home4.propTypes = {
  subscribeToMore: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  getCart: PropTypes.object
};

export default compose(withGetCart, withDeleteCartItem, translate('home'))(Home4);
