import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { PropTypes } from 'prop-types';
import { PageLayout } from '@gqlapp/look-client-react';

import AddressView from '../components/AddressView';

const ADDRESSES = [
  {
    id: 5,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  },
  {
    id: 3,
    streetAddress1: 'Room A308, Manas Hostel, IITG',
    streetAddress2: 'Guwahati, North Guwahati',
    state: 'Assam',
    city: 'Guwahati',
    pinCode: '7810390',
    mobile: '+91-9085626859'
  }
];

class Address extends React.Component {
  render() {
    console.log('props', this.props);
    return (
      <PageLayout>
        {!this.props.loading && <AddressView addresses={ADDRESSES} addressId={ADDRESSES[0].id} {...this.props} />}
      </PageLayout>
    );
  }
}

Address.propTypes = {
  loading: PropTypes.bool
};

export default compose(translate('addresses'))(Address);
