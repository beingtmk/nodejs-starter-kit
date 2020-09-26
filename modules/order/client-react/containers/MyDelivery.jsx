import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import update from 'immutability-helper';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCurrentUser, withOrders } from './OrderOperations';

import MyDeliveryView from '../components/MyDeliveryView';

const MyDeliveryContainer = compose(withOrders)(props => {
  console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

const MyDelivery = props => {
  const { currentUser } = props;

  // console.log('props', props);
  return (
    <MyDeliveryContainer filter={{ vendorId: currentUser && currentUser.id }} {...props}>
      <MyDeliveryView />
    </MyDeliveryContainer>
  );
};

MyDelivery.propTypes = {
  //   usersUpdated: PropTypes.object,
  //   updateQuery: PropTypes.func,
  currentUser: PropTypes.func,
  t: PropTypes.func
  //   subscribeToMore: PropTypes.func,
  //   filter: PropTypes.object
};

export default compose(withCurrentUser, translate('order'))(MyDelivery);
