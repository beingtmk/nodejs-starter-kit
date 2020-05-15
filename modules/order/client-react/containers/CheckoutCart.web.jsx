import React, { useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { message } from 'antd';

import { Loader } from '@gqlapp/look-client-react';
import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import { FormError } from '@gqlapp/forms-client-react';
import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

import CheckoutCartView from '../components/CheckoutCartView';

const ORDER = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      thumbnail: {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
      },
      title: 'Listing 1',
      price: 322,
      date: 'Wed May 20 2020',
      quantity: 4
    },
    {
      id: 2,
      thumbnail: {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg'
      },
      title: 'Listing 2',
      price: 322,
      date: 'Wed May 20 2020',
      quantity: 3
    }
  ]
  // , delivery: {
  //   address
  // }
};

const CheckoutCart = props => {
  // useEffect(() => {
  //   console.log('use effect', props.subscribeToMore);
  //   const subscribe = subscribeToOrders(props.subscribeToMore);
  //   props.refetch();
  //   return () => subscribe();
  // });

  // const onSubmit = async values => {
  //   const { history, navigation } = props;

  //   // Get Values

  //   console.log('onSubmit Called!');

  //   // Add Message
  //   message.info('Success! Select your Billing Address.');

  //   // Redirect
  //   if (history) {
  //     return history.push('/checkout-bill/');
  //   }
  //   if (navigation) {
  //     return navigation.goBack();
  //   }
  // };

  console.log('checkout cart cont', props);

  return (
    <>
      {/* {props.currentUserLoading || props.cartLoading ? (
        <Loader />
      ) : ( */}
      <CheckoutCartView
        order={ORDER}
        // deleteProduct={deleteProduct}
        // onSubmit={onSubmit}
        // cart={props.cart}
        {...props}
      />
      {/* )} */}
    </>
  );
};

// const onAddOrder = (prev, node) => {
//   console.log('subscription add', prev, node);
//   // ignore if duplicate
//   // if (prev.blogs.some(item => node.id === item.id)) {
//   //   return prev;
//   // }
//   return update(prev, {
//     blogs: {
//       $set: node
//     }
//   });
// };

// const onDelete = (prev, id) => {
//   console.log('subscription deleted');

//   // ignore if not found
//   if (prev.id !== id) {
//     return prev;
//   }

//   return update(prev, {
//     orders: {
//       $set: null
//     }
//   });
// };

// const subscribeToOrders = subscribeToMore =>
//   subscribeToMore({
//     document: ORDERS_SUBSCRIPTION,
//     updateQuery: (
//       prev,
//       {
//         subscriptionData: {
//           data: {
//             ordersUpdated: { mutation, node }
//           }
//         }
//       }
//     ) => {
//       console.log('subscribed');
//       let newResult = prev;
//       if (mutation === 'CREATED') {
//         newResult = onAddOrder(prev, node);
//       } else if (mutation === 'UPDATED') {
//         newResult = onAddOrder(prev, node);
//       } else if (mutation === 'DELETED') {
//         newResult = onDeleteOrder(prev, node.id);
//       }
//       return newResult;
//     }
//   });

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
  translate('events')
)(CheckoutCart);
