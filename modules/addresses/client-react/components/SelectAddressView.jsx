import React from 'react';
import PropTypes from 'prop-types';

import { Spinner, Divider } from '@gqlapp/look-client-react';

import AddressItemComponent from './AddressItemComponent';

const SelectAddressView = props => {
  const { loading, addresses, t, addOrEditAddresses, deleteAddress } = props;
  return (
    <>
      {loading && <Spinner />}
      {!loading &&
        addresses &&
        addresses.map((a, i) => (
          <>
            <AddressItemComponent address={a} t={t} onEdit={addOrEditAddresses} onDelete={() => deleteAddress(a.id)} />
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
  deleteAddress: PropTypes.func
};

export default SelectAddressView;
