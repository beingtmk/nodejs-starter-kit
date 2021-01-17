import React from 'react';
import PropTypes from 'prop-types';

import { ModalDrawer, Icon } from '@gqlapp/look-client-react';

import AddressForm from './AddressForm';

const AddAddressBtnView = props => {
  const { addOrEditAddresses, t } = props;
  return (
    <ModalDrawer
      buttonText={
        <>
          <Icon type="PlusOutlined" /> Add new address
        </>
      }
      modalTitle="Edit Address"
      block={false}
      height="auto"
      size="md"
      type="default"
    >
      <AddressForm t={t} onSubmit={addOrEditAddresses} />
    </ModalDrawer>
  );
};

AddAddressBtnView.propTypes = {
  addOrEditAddresses: PropTypes.func,
  t: PropTypes.func
};

export default AddAddressBtnView;
