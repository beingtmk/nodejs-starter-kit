import React, { useEffect } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import OrdersView from '../components/OrdersView';
import {
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates,
  withDeleteOrder
} from './OrderOperations';

const Orders = props => {
  const { t, updateQuery, deleteOrder, subscribeToMore } = props;
  const filter = {};
  // const filter = { isActive: true };
  // const usersUpdated = useUsersWithSubscription(subscribeToMore, filter);
  // console.log('users', props);
  // useEffect(() => {
  //   if (usersUpdated) {
  //     updateUsersState(usersUpdated, updateQuery);
  //   }
  // });

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
  return <OrdersView onDelete={handleDelete} filter={filter} {...props} />;
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
  translate('order')
)(Orders);
