import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CheckoutCartView from '../components/CheckoutCartView';
import { withCurrentUser, withGetCart, withDeleteCartItem, withEditOrderDetail } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';

const CheckoutCart = props => {
  const { getCart, deleteOrderDetail, editOrderDetail, subscribeToMore, history } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  const handleEdit = (id, optionsId, listingCost, values) => {
    try {
      const input = {
        id,
        listingCost,
        orderOptions: {
          id: optionsId,
          quantity: values.quantity
        }
      };
      // console.log(input);
      const output = editOrderDetail(input);
      output ? Message.success('Edited successfully') : Message.error('Try again');
    } catch (e) {
      throw Error(e);
    }
  };

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <CheckoutCartView onEdit={handleEdit} onDelete={handleDelete} {...props} />;
};
CheckoutCart.propTypes = {
  getCart: PropTypes.object,
  deleteOrderDetail: PropTypes.func,
  editOrderDetail: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object
};

export default compose(
  withCurrentUser,
  withGetCart,
  withDeleteCartItem,
  withEditOrderDetail,

  translate('order')
)(CheckoutCart);
