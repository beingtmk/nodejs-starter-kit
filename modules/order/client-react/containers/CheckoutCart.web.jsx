import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

// import EDIT_ORDER from '../graphql/EditOrder.graphql';

import CheckoutCartView from '../components/CheckoutCartView';
import { withCurrentUser, withGetCart, withDeleteCartItem } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';

const CheckoutCart = props => {
  const { getCart, deleteOrderDetail, editOrder, subscribeToMore, history } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  // const handleSubmit = async values => {
  //   console.log('props', props, 'values', values);
  //   const index = getCart.orderDetails.indexOf(getCart.orderDetails.filter((order, index) => order.id === values.id)[0]);
  //   getCart.orderDetails[index] = values;
  //   console.log('value', {
  //     id: getCart.id,
  //     state: getCart.state,
  //     orderDetails: Object.values(removeTypename(getCart.orderDetails)),
  //   });

  //   try {
  //     await editOrder({
  //       id: getCart.id,
  //       state: getCart.state,
  //       orderDetails: Object.values(removeTypename(getCart.orderDetails)),
  //     });
  //   } catch (e) {
  //     throw Error(e);
  //   }
  // };

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <CheckoutCartView
      // onSubmit={handleSubmit}
      onDelete={handleDelete}
      {...props}
    />
  );
};
CheckoutCart.propTypes = {
  getCart: PropTypes.object,
  deleteOrderDetail: PropTypes.func,
  editOrder: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object
};

export default compose(
  withCurrentUser,
  withGetCart,
  withDeleteCartItem,
  // graphql(EDIT_ORDER, {
  //   props: ({ mutate }) => ({
  //     editOrder: async input => {
  //       const {
  //         data: { editOrder }
  //       } = await mutate({
  //         variables: { input }
  //       });

  //       return editOrder;
  //     }
  //   })
  // }),
  translate('orders')
)(CheckoutCart);
