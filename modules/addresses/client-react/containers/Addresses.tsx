import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import AddressesView from '../components/AddressesView';

interface AddressesProps {
  t: TranslateFunction;
}

const addresses = [
  {
    id: 1,
    streetAddress1: 'Devgiri boys hostel',
    streetAddress2: 'Sinhgad central library',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: 411041
  },
  {
    id: 2,
    streetAddress1: 'Devgiri boys hostel',
    streetAddress2: 'Sinhgad central library',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: 411041
  }
];

class Addresses extends React.Component<AddressesProps> {
  public render() {
    return <AddressesView {...this.props} addresses={addresses} />;
  }
}

export default translate('addresses')(Addresses);
