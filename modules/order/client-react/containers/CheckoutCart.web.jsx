import React, { useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

// import { Loader } from '@gqlapp/look-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import { FormError } from '@gqlapp/forms-client-react';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';
import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';

import CheckoutCartView from '../components/CheckoutCartView';

const CheckoutCart = props => {
  useEffect(() => {
    console.log('use effect', props.subscribeToMore);
    const subscribe = subscribeToOrders(props.subscribeToMore);
    props.refetch();
    return () => subscribe();
  });

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

  return (
    <>
      {props.currentUserLoading || props.cartLoading ? (
        <>Loading...</>
      ) : (
        <CheckoutCartView
          order={props.getCart}
          // deleteProduct={deleteProduct}
          // onSubmit={onSubmit}
          // cart={props.cart}
          {...props}
        />
      )}
    </>
  );
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
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        currentUserLoading: loading,
        currentUser
      };
    }
  }),
  graphql(GET_CART_QUERY, {
    props({ data: { loading, error, getCart, subscribeToMore, refetch } }) {
      if (error) {
        throw new Error(error);
      }
      return { cartLoading: loading, getCart, subscribeToMore, refetch };
    }
  }),

  translate('orders')
)(CheckoutCart);
