import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import update from 'immutability-helper';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import PATCH_ORDER from '../graphql/PatchOrder.graphql';
import GET_CART_QUERY from '../graphql/GetCartQuery.graphql';
import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';
import ROUTES from '../routes';

// import ORDER_PAYMENT from '../graphql/OrderPayment.graphql';
// import PATCH_ORDER_PAYMENT from '../graphql/PatchOrderPayment.graphql';

import CheckoutOrderView from '../components/CheckoutOrderView';

const CheckoutOrder = props => {
  const { history, navigation, orderPayment, subscribeToMore, refetch } = props;

  useEffect(() => {
    const subscribe = subscribeToOrders(subscribeToMore);
    refetch();
    return () => subscribe();
  });
  // console.log('orderPayment', orderPayment);
  const openCheckout = () => {
    // Variables
    // props.orderPaymentRefetch();
    const orderId = orderPayment.orderId;
    const amount = orderPayment.razorpayTransactionAmount;
    const razorpayOrderId = orderPayment.razorpayOrderId;

    let options = {
      key: 'rzp_test_vmG2tbpGt4EDR2',
      key_secret: 'zOerAsWXjhWe9fr8i38F5g1X',
      amount: amount, // 2000 paise = INR 20, amount in paisa
      currency: 'INR',
      name: 'Gems Premium',
      description: 'Payment for your order.',
      image:
        'https://res.cloudinary.com/approxyma/image/upload/v1596304728/rsz_logo_final-0-removebg-preview_biq5n2.png',
      // order_id: razorpayOrderId, //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      handler: function handler(response) {
        // console.log(response);
        document.getElementById('razorpay_order_id').value = response.razorpay_order_id;
        document.getElementById('razorpay_payment_id').value = response.razorpay_payment_id;
        document.getElementById('razorpay_signature').value = response.razorpay_signature;
        document.getElementById('rp_button').click();
      },
      // prefill: {
      //   name: 'Harshil Mathur',
      //   email: 'harshil@razorpay.com'
      // },
      notes: {
        address: 'note value'
      },

      theme: {
        color: '#df0303'
      }
    };

    let rzp = new window.Razorpay(options);
    rzp.open();
  };

  async function onSubmit(e) {
    e.preventDefault();

    // console.log('onSubmit Called!');
    const razorpayOrderId = document.getElementById('razorpay_order_id').value;
    const razorpaySignature = document.getElementById('razorpay_signature').value;
    const razorpayPaymentId = document.getElementById('razorpay_payment_id').value;

    // Get Values
    // const finalObj = {
    //   id: props.orderPayment.id,
    //   razorpaySignature,
    //   razorpayPaymentId,
    //   razorpayOrderId,
    //   status: 'completed',
    // };
    // console.log('paymmmmmmm', finalObj);

    try {
      // await props.patchOrderPayment(finalObj);
      await props.patchOrder({ id: props.getCart.id, state: 'INITIATED' });
      if (history) {
        return history.push(`${ROUTES.myOrder}`);
      }
    } catch (e) {
      message.error('Failed!');
      console.log(e);
      // throw new FormError('Failed!', e);
    }

    // Redirect
  }

  // console.log('props', props);
  if (props.loading) {
    return (
      <div align="center">
        <br />
        <br />
        <Spin />
      </div>
    );
  }
  return (
    <>
      <CheckoutOrderView openCheckout={openCheckout} onSubmit={onSubmit} {...props} />
      {/* <div ref={el => (this.instance = el)} /> */}

      <form onSubmit={onSubmit} id="rp_custom" hidden>
        <input type="text" id="razorpay_order_id" />
        <input type="text" id="razorpay_signature" />
        <input type="text" id="razorpay_payment_id" />
        <input type="submit" id="rp_button" />
      </form>
    </>
  );
};
const onAddOrder = (prev, node) => {
  // ignore if duplicate
  // if (prev.blogs.some(item => node.id === item.id)) {
  //   return prev;
  // }
  return update(prev, {
    getCart: {
      orderDetails: {
        $push: [node]
      }
    }
  });
};
const onAddressUpdate = (prev, node) => {
  // ignore if duplicate
  // if (prev.blogs.some(item => node.id === item.id)) {
  //   return prev;
  // }
  return update(prev, {
    getCart: {
      $set: [node]
    }
  });
};
const onDeleteOrder = (prev, node) => {
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
      let newResult = prev;
      if (mutation === 'CREATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onAddOrder(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrder(prev, node);
      } else if (mutation === 'ADDRESS_UPDATED') {
        newResult = onAddressUpdate(prev, node);
      }
      return newResult;
    }
  });
export default compose(
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { currentUserLoading: loading, currentUser };
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
  // graphql(ORDER_PAYMENT, {
  //   props({ data: { loading, error, orderPayment, refetch } }) {
  //     if (error) throw new Error(error);
  //     // console.log(orderPayment);
  //     return { loading, orderPayment, orderPaymentRefetch: refetch };
  //   },
  // }),
  // graphql(PATCH_ORDER_PAYMENT, {
  //   props: ({ ownProps: { history, navigation }, mutate }) => ({
  //     patchOrderPayment: async values => {
  //       // console.log('mutation called in container', values);
  //       await mutate({
  //         variables: {
  //           input: values,
  //         },
  //       });
  //     },
  //   }),
  // }),
  graphql(PATCH_ORDER, {
    props: ({ mutate }) => ({
      patchOrder: async values => {
        // console.log('mutation start', values);
        await mutate({
          variables: {
            input: values
          }
        });
        // console.log(values, 'mutation called');
      }
    })
  })
)(CheckoutOrder);
