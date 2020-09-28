import React from 'react';
import { compose } from '@gqlapp/core-common';
import { graphql } from 'react-apollo';
import { withOrder } from './OrderOperations';
import OrderDetailsView from '../components/OrderDetailsView';

const OrderDetails = props => {
  // console.log('props', props);
  return <OrderDetailsView {...props} />;
};

export default compose(withOrder)(OrderDetails);
