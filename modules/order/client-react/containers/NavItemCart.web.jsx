import React, { useEffect } from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { Icon, Badge } from 'antd';

import { translate } from '@gqlapp/i18n-client-react';
import update from 'immutability-helper';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';

const NavItemCart = props => {
  // useEffect(() => {
  //   console.log('use effect', props.subscribeToMore);
  //   const subscribe = subscribeToOrders(props.subscribeToMore);
  //   return () => subscribe();
  // });

  return (
    <>
      {!props.currentUserLoading && (
        <>
          <Icon type="shopping-cart" /> Cart{' '}
          <Badge
            style={{ marginTop: '-5px' }}
            count={props.order && props.order.orderDetails && props.order.orderDetails.length}
          />
        </>
      )}
    </>
  );
};

// const onAddOrder = (prev, node) => {
//   console.log('subscription add', prev, node);
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
  translate('order')
)(NavItemCart);
