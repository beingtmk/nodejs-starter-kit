import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCurrentUser, withOrdersState, withFilterUpdating, withOrderStates, withOrders } from './OrderOperations';
import { subscribeToOrders } from './OrderSubscriptions';

import MyDeliveryView from '../components/MyDeliveryView';

const MyDeliveryContainer = compose(withOrders)(props => {
  const { ordersSubscribeToMore, refetch } = props;
  useEffect(() => {
    const subscribe = subscribeToOrders(ordersSubscribeToMore, props.filter);
    refetch();
    return () => subscribe();
  }, [ordersSubscribeToMore, props.filter, refetch]);

  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

const MyDelivery = props => {
  const { currentUser, filter, currentUserLoading } = props;

  // console.log('props', props);
  return (
    !currentUserLoading && (
      <MyDeliveryContainer filter={{ vendorId: currentUser && currentUser.id, ...filter }} {...props}>
        <MyDeliveryView {...props} />
      </MyDeliveryContainer>
    )
  );
};

MyDelivery.propTypes = {
  currentUserLoading: PropTypes.bool,
  filter: PropTypes.object,
  currentUser: PropTypes.object,
  t: PropTypes.func
};

export default compose(
  withCurrentUser,
  withOrdersState,
  withFilterUpdating,
  withOrderStates,
  translate('order')
)(MyDelivery);
