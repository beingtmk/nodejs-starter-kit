import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';
import OrderDetailsView from '../components/OrderDetailsView';

import { withOrder } from './OrderOperations';
import { subscribeToOrder } from './OrderSubscriptions';

const OrderDetails = props => {
  const { order, subscribeToMore, history } = props;

  React.useEffect(() => {
    const subscribe = subscribeToOrder(subscribeToMore, order && order.id, history);
    return () => subscribe();
  });

  return <OrderDetailsView {...props} />;
};

OrderDetails.propTypes = {
  order: PropTypes.object,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object
};

export default compose(withOrder, translate('order'))(OrderDetails);
