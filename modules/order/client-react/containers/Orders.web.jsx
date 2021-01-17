import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import OrdersView from '../components/OrdersView';
import {
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates,
  withDeleteOrder,
  withPatchOrderState
} from './OrderOperations';
import { subscribeToOrders } from './OrderSubscriptions';

const Orders = props => {
  const { deleteOrder, ordersSubscribeToMore, patchOrderState } = props;
  // eslint-disable-next-line no-unused-vars
  const [load, setLoad] = React.useState(false);
  const filter = {};

  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    return () => subscribe();
  });

  const handlePatchOrderState = (orderId, state) => {
    try {
      Message.destroy();
      Message.error('Processing.');
      patchOrderState(orderId, state);
      Message.destroy();
      Message.success(`State change to ${state}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleDelete = id => {
    try {
      Message.destroy();
      Message.error('Processing.');
      deleteOrder(id);
      Message.destroy();
      Message.error('Order deleted.');
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <OrdersView
      load={load}
      onDelete={handleDelete}
      onPatchOrderState={handlePatchOrderState}
      filter={filter}
      {...props}
    />
  );
};

Orders.propTypes = {
  ordersSubscribeToMore: PropTypes.func,
  patchOrderState: PropTypes.func,
  deleteOrder: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates,
  withDeleteOrder,
  withPatchOrderState,
  translate('order')
)(Orders);
