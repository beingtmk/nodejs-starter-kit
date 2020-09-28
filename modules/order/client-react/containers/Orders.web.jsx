import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

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
  const { t, updateQuery, deleteOrder, ordersSubscribeToMore, patchOrderState } = props;
  const [load, setLoad] = React.useState(false);
  const filter = {};

  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    return () => subscribe();
  });

  const handlePatchOrderState = (orderId, state) => {
    try {
      message.destroy();
      message.error('Processing.');
      patchOrderState(orderId, state);
      message.destroy();
      message.success(`State change to ${state}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleDelete = id => {
    try {
      message.destroy();
      message.error('Processing.');
      deleteOrder(id);
      message.destroy();
      message.error('Order deleted.');
    } catch (e) {
      throw Error(e);
    }
  };

  console.log('props', props);
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

// Orders.propTypes = {
//   usersUpdated: PropTypes.object,
//   updateQuery: PropTypes.func,
//   t: PropTypes.func,
//   subscribeToMore: PropTypes.func,
//   filter: PropTypes.object
// };

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
