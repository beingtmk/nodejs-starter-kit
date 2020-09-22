import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import update from 'immutability-helper';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCurrentUser, withOrders } from './OrderOperations';

import MyOrdersView from '../components/MyOrdersView';

const MyOrdersContainer = compose(withOrders)(props => {
  // console.log('props', props);
  return React.cloneElement(props.children, { ...props });
});

const MyOrders = props => {
  const { currentUser } = props;

  // console.log('props', props);
  return (
    <MyOrdersContainer filter={{ consumerId: currentUser && currentUser.id }} {...props}>
      <MyOrdersView />
    </MyOrdersContainer>
  );
};

MyOrders.propTypes = {
  //   usersUpdated: PropTypes.object,
  //   updateQuery: PropTypes.func,
  currentUser: PropTypes.func,
  t: PropTypes.func
  //   subscribeToMore: PropTypes.func,
  //   filter: PropTypes.object
};

export default compose(
  withCurrentUser,
  translate('order')
)(MyOrders);
