import React from 'react';
import { compose } from '@gqlapp/core-common';

import { withAddOrEditAddress } from './AddressOperations';
import AddAddressBtnView from '../components/AddAddressBtnView';

const AddAddressBtn = props => {
  // console.log('props', props);
  return <AddAddressBtnView {...props} />;
};

export default compose(withAddOrEditAddress)(AddAddressBtn);
