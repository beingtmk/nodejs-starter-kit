import React from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import OrderStatusMailView from '../components/OrderStatusMailView';
import { withOrderStatusMail } from './OrderOperations';

const OrderStatusMail = props => {
  const { orderStatusMail } = props;

  const handleSubmit = (orderId, note) => {
    try {
      orderStatusMail(orderId, note);
    } catch (e) {
      throw new Error(e);
    }
  };
  // console.log('props', props);
  return <OrderStatusMailView onSubmit={handleSubmit} {...props} />;
};

OrderStatusMail.propTypes = {
  orderStatusMail: PropTypes.func
};

export default compose(withOrderStatusMail)(OrderStatusMail);
