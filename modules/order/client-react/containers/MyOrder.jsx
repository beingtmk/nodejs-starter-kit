import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCurrentUser, withOrdersState, withFilterUpdating, withOrderStates, withOrders } from './OrderOperations';

import MyOrdersView from '../components/MyOrdersView';
import { subscribeToOrders } from './OrderSubscriptions';

const MyOrdersContainer = compose(withOrders)(props => {
  const { ordersSubscribeToMore, refetch } = props;
  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    refetch();
    return () => subscribe();
  });
  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

const MyOrders = props => {
  const { currentUser, filter, currentUserLoading } = props;

  // console.log('props', props);
  return (
    !currentUserLoading && (
      <MyOrdersContainer filter={{ consumerId: currentUser && currentUser.id, ...filter }}>
        <MyOrdersView {...props} />
      </MyOrdersContainer>
    )
  );
};

MyOrders.propTypes = {
  currentUserLoading: PropTypes.bool,
  filter: PropTypes.object,
  //   updateQuery: PropTypes.func,
  currentUser: PropTypes.object,
  t: PropTypes.func
  // ordersSubscribeToMore: PropTypes.func,
  //   filter: PropTypes.object
};

export default compose(
  withCurrentUser,
  withOrdersState,
  withFilterUpdating,
  withOrderStates,
  translate('order')
)(MyOrders);
