import React from 'react';
import PropTypes from 'prop-types';

import { Spinner, Divider } from '@gqlapp/look-client-react';

import AddressItemComponent from './AddressItemComponent';

const SelectAddressView = props => {
  const { loading, addresses, active, t, addOrEditAddresses, deleteAddress, onSubmit, onAddressSelect } = props;

  // console.log('id', active);
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
              setActive={onAddressSelect}
              onEdit={addOrEditAddresses}
              onDelete={() => deleteAddress(a.id)}
              setDefault={onSubmit}
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
  onAddressSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  active: PropTypes.number,
  getDefaultAddressId: PropTypes.number
};

export default SelectAddressView;
