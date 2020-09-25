import React, { useEffect } from 'react';
import { compose, removeTypename } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';

// import { Loader } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';
import EDIT_ORDER from '../graphql/EditOrder.graphql';

import CheckoutCartView from '../components/CheckoutCartView';
import { withCurrentUser, withGetCart } from './OrderOperations';

const CheckoutCart = props => {
  const { getCart, editOrder } = props;
  // useEffect(() => {
  //   console.log('use effect', props.subscribeToMore);
  //   const subscribe = subscribeToOrders(props.subscribeToMore);
  //   props.refetch();
  //   return () => subscribe();
  // });

  const handleSubmit = async values => {
    console.log('props', props, 'values', values);
    const index = getCart.orderDetails.indexOf(
      getCart.orderDetails.filter((order, index) => order.id === values.id)[0]
    );
    getCart.orderDetails[index] = values;
    console.log('value', {
      id: getCart.id,
      state: getCart.state,
      orderDetails: Object.values(removeTypename(getCart.orderDetails))
    });

    try {
      await editOrder({
        id: getCart.id,
        state: getCart.state,
        orderDetails: Object.values(removeTypename(getCart.orderDetails))
      });
    } catch (e) {
      throw Error(e);
    }
  };

  // const onSubmit = async () => {
  //   const { history, navigation } = props;

  //   // Redirect
  //   if (history) {
  //     return history.push('/checkout-bill/');
  //   }
  //   if (navigation) {
  //     return navigation.goBack();
  //   }
  // };

  return <CheckoutCartView onSubmit={handleSubmit} {...props} />;
};

const onAddOrder = (prev, node) => {
  console.log('subscription add', prev, node);
  // ignore if duplicate
  // if (prev.blogs.some(item => node.id === item.id)) {
  //   return prev;
  // }
  return update(prev, {
    getCart: {
      $set: node
    }
  });
};

const onDeleteOrder = (prev, node) => {
  console.log('subscription deleted');

  // ignore if not found
  if (prev.id !== node.id) {
    return prev;
  }

  return update(prev, {
    getCart: {
      $set: node
    }
  });
};

const subscribeToOrders = subscribeToMore =>
  subscribeToMore({
    document: ORDERS_SUBSCRIPTION,
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            ordersUpdated: { mutation, node }
          }
        }
      }
    ) => {
      console.log('subscribed');
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrder(prev, node);
      }
      return newResult;
    }
  });

export default compose(
  withCurrentUser,
  withGetCart,
  graphql(EDIT_ORDER, {
    props: ({ mutate }) => ({
      editOrder: async input => {
        const {
          data: { editOrder }
        } = await mutate({
          variables: { input }
        });

        return editOrder;
      }
    })
  }),
  translate('orders')
)(CheckoutCart);
