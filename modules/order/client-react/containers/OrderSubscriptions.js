import React from 'react';
import { message } from 'antd';
import update from 'immutability-helper';
import { Redirect } from 'react-router-dom';

import ROUTES from '../routes';

import ORDER_SUBSCRIPTION from '../graphql/OrderSubscription.graphql';

export const subscribeToCart = (subscribeToMore, orderId, history) =>
  subscribeToMore({
    document: ORDER_SUBSCRIPTION,
    variables: { id: orderId },
    updateQuery: (
      prev,
      {
        subscriptionData: {
          data: {
            orderUpdated: { mutation, node }
          }
        }
      }
    ) => {
      let newResult = prev;
      console.log('mutation', mutation, node);
      if (mutation === 'UPDATED') {
        newResult = onEditCart(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteCart(history);
      }
      return newResult;
    }
  });

function onEditCart(prev, node) {
  return update(prev, {
    getCart: {
      $set: node
    }
  });
}

const onDeleteCart = history => {
  message.info('This cart has been deleted!');
  message.warn('Redirecting to my orders');
  if (history) {
    return history.push(`${ROUTES.myOrder}`);
  } else {
    return <Redirect to={'/'} />;
  }
};
