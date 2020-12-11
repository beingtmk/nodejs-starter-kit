import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Spinner, Divider } from '@gqlapp/look-client-react';

import AddressItemComponent from './AddressItemComponent';

const SelectAddressView = props => {
  const [active, setActive] = useState(0);
  const { onSelect, loading, addresses, t, addOrEditAddresses, deleteAddress } = props;

  const handleSelect = id => {
    setActive(id);
    onSelect(id);
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading &&
        addresses &&
        addresses.map((a, i) => (
          <>
            <AddressItemComponent
              active={active}
              address={a}
              t={t}
              setActive={handleSelect}
              onEdit={addOrEditAddresses}
              onDelete={() => deleteAddress(a.id)}
            />
            {addresses.length - 1 !== i ? <Divider /> : <br />}
          </>
        ))}
    </>
  );
};

SelectAddressView.propTypes = {
  loading: PropTypes.bool,
  addresses: PropTypes.object,
  t: PropTypes.func,
  addOrEditAddresses: PropTypes.func,
  deleteAddress: PropTypes.func,
  onSelect: PropTypes.func
};

export default SelectAddressView;
