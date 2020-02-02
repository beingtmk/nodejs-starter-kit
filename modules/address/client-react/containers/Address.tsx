import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import AddressView from '../components/AddressView';

interface AddressProps {
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

class Address extends React.Component<AddressProps> {
  public render() {
    return <AddressView {...this.props} addresses={addresses} />;
  }
}

export default translate('address')(Address);
