import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import OrdersView from '../components/OrdersView';
import {
  withOrdersState,
  withOrders,
  withFilterUpdating,
  withOrderByUpdating,
  withOrderStates
} from './OrderOperations';

const Orders = props => {
  // const { t, updateQuery, subscribeToMore } = props;
  // const filter = { isActive: true };
  // const usersUpdated = useUsersWithSubscription(subscribeToMore, filter);
  // console.log('users', props);
  // useEffect(() => {
  //   if (usersUpdated) {
  //     updateUsersState(usersUpdated, updateQuery);
  //   }
  // });

  console.log('props', props);
  return <OrdersView {...props} />;
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
  translate('order')
)(Orders);
