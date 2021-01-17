import React, { useState, useEffect } from 'react';
import { Message } from '@gqlapp/look-client-react';
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
  Message.info('This cart has been deleted!');
  Message.warn('Redirecting to my orders');
  if (history) {
    return history.push(`${ROUTES.myOrder}`);
  } else {
    return <Redirect to={'/'} />;
  }
};

export const subscribeToOrder = (subscribeToMore, orderId, history) =>
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
        newResult = onEditOrder(prev, node);
      } else if (mutation === 'DELETED') {
        newResult = onDeleteOrder(history);
      }
      return newResult;
    }
  });

function onEditOrder(prev, node) {
  return update(prev, {
    order: {
      $set: node
    }
  });
}

const onDeleteOrder = history => {
  Message.info('This cart has been deleted!');
  Message.warn('Redirecting to my orders');
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

export const SubscribeToOrdersForMyOrders = (subscribeToMore, filter) => {
  const [ordersUpdated, setOrdersUpdated] = useState(null);

  useEffect(() => {
    const subscribe = subscribeToOrders();
    return () => subscribe();
  });

  const subscribeToOrders = () => {
    return subscribeToMore({
      document: ORDERS_SUBSCRIPTION,
      variables: { filter },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data: { ordersUpdated: newData }
          }
        }
      ) => {
        setOrdersUpdated(newData);
      }
    });
  };

  return ordersUpdated;
};

export const updateOrdersState = (OrdersUpdated, updateQuery) => {
  const { mutation, node } = OrdersUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return onAddOrders(prev, node);
      case 'DELETED':
        return onDeleteOrders(prev, node.id);
      case 'UPDATED':
        return onEditOrders(prev, node);
      default:
        return prev;
    }
  });
};

function onAddOrders(prev, node) {
  if (prev.orders && prev.orders.edges.some(order => node.id === order.cursor)) {
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
