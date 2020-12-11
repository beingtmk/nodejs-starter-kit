import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { withAddresses, withAddOrEditAddress, withDeleteAddress } from './AddressOperations';
import { subscribeToAddresses } from './AddressSubscriptions';
import SelectAddressView from '../components/SelectAddressView';

const SelectAddress = props => {
  const { subscribeToMore, currentUser } = props;

  useEffect(() => {
    const subscribe = subscribeToAddresses(subscribeToMore, currentUser && currentUser.id);
    return () => subscribe();
  });

  return <SelectAddressView {...props} />;
};

SelectAddress.propTypes = {
  subscribeToMore: PropTypes.func,
  currentUser: PropTypes.object
};

export default compose(withAddresses, withAddOrEditAddress, withDeleteAddress, translate('addresses'))(SelectAddress);
