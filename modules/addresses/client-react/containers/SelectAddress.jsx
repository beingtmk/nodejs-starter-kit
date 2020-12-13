import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import { withAddresses, withAddOrEditAddress, withDeleteAddress, withSetDefaultAddress } from './AddressOperations';
import { subscribeToAddresses } from './AddressSubscriptions';
import SelectAddressView from '../components/SelectAddressView';

const SelectAddress = props => {
  const { subscribeToMore, currentUser, setDefaultAddress } = props;

  useEffect(() => {
    const subscribe = subscribeToAddresses(subscribeToMore, currentUser && currentUser.id);
    return () => subscribe();
  });

  const handleSubmit = id => {
    try {
      setDefaultAddress(id);
    } catch (e) {
      throw Error(e);
    }
  };

  return <SelectAddressView onSubmit={handleSubmit} {...props} />;
};

SelectAddress.propTypes = {
  subscribeToMore: PropTypes.func,
  setDefaultAddress: PropTypes.func,
  currentUser: PropTypes.object
};

export default compose(
  withAddresses,
  withAddOrEditAddress,
  withSetDefaultAddress,
  withDeleteAddress,
  translate('addresses')
)(SelectAddress);
