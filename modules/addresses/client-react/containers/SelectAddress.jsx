import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';

import {
  withAddresses,
  withAddOrEditAddress,
  withDeleteAddress,
  withGetDefaultAddressId,
  withSetDefaultAddress
} from './AddressOperations';
import { subscribeToAddresses } from './AddressSubscriptions';
import SelectAddressView from '../components/SelectAddressView';

const SelectAddress = props => {
  const { subscribeToMore, currentUser, setDefaultAddress, onSelect, getDefaultAddressId } = props;
  const [active, setActive] = useState(/* getDefaultAddressId || */ 0);

  useEffect(() => {
    const subscribe = subscribeToAddresses(subscribeToMore, currentUser && currentUser.id);
    return () => subscribe();
  });

  const handleSelect = useRef(() => {});
  handleSelect.current = id => {
    setActive(id);
    onSelect(id);
  };
  useEffect(() => {
    if (active == 0) {
      handleSelect.current(getDefaultAddressId);
    } else if (!active) {
      return handleSelect.current(getDefaultAddressId);
    }
  }, [active, getDefaultAddressId, handleSelect]);

  const handleSubmit = id => {
    try {
      setDefaultAddress(id);
    } catch (e) {
      throw Error(e);
    }
  };

  return (
    <SelectAddressView active={active} onSubmit={handleSubmit} onAddressSelect={handleSelect.current} {...props} />
  );
};

SelectAddress.propTypes = {
  subscribeToMore: PropTypes.func,
  setDefaultAddress: PropTypes.func,
  currentUser: PropTypes.object,
  onSelect: PropTypes.func,
  getDefaultAddressId: PropTypes.number
};

export default compose(
  withAddresses,
  withAddOrEditAddress,
  withSetDefaultAddress,
  withDeleteAddress,
  withGetDefaultAddressId,
  translate('addresses')
)(SelectAddress);
