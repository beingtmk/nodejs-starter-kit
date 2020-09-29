import React from 'react';
import { message } from 'antd';
import update from 'immutability-helper';
import { Redirect } from 'react-router-dom';

import ROUTES from '../routes';

import ORDER_SUBSCRIPTION from '../graphql/OrderSubscription.graphql';
import ORDERS_SUBSCRIPTION from '../graphql/OrdersSubscription.graphql';

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
      // console.log('mutation', mutation, node);
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

export const subscribeToOrders = (subscribeToMore, filter) =>
  subscribeToMore({
    document: ORDERS_SUBSCRIPTION,
    variables: { filter },
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
      console.log(prev, node, 'func');
      if (mutation === 'CREATED') {
        newResult = onAddOrders(prev, node);
      } else if (mutation === 'UPDATED') {
        newResult = onEditOrders(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrders(prev, node.id);
      }
      return newResult;
    }
  });

function onAddOrders(prev, node) {
  console.log('prev', prev, node);
  if (prev.orders && prev.orders.edges.some(order => node.id === order.cursor)) {
    console.log('bleh');
    return update(prev, {
      orders: {
        totalCount: {
          $set: prev.orders.totalCount - 1
        },
        edges: {
          $set: prev.orders.edges
        }
      }
    });
  }

  if (prev.orders) {
    const filteredOrders = prev.orders.edges.filter(order => order.node.id !== null);
    const edge = {
      cursor: node.id,
      node: node,
      __typename: 'OrderEdges'
    };
    console.log([edge, ...filteredOrders]);
    return update(prev, {
      orders: {
        totalCount: {
          $set: prev.orders.totalCount + 1
        },
        edges: {
          $set: [edge, ...filteredOrders]
        }
      }
    });
  }
  console.log('prev.orders is undefined');
}

function onEditOrders(prev, node) {
  const index = prev.orders.edges.findIndex(x => x.node.id === node.id);
  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'OrderEdges'
  };
  if (index) {
    // console.log('index', index);
    prev.orders.edges.splice(index, 1, edge);
    // console.log(prev.orders.edges);
    return update(prev, {
      orders: {
        edges: {
          $set: [...prev.orders.edges]
        }
      }
    });
  }
}

const onDeleteOrders = (prev, id) => {
  // console.log('called', id);
  const index = prev.orders.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    orders: {
      totalCount: {
        $set: prev.orders.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
};
