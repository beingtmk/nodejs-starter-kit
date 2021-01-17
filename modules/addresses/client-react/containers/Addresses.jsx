import React from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout } from '@gqlapp/look-client-react';
import { withCurrentUser } from '@gqlapp/user-client-react/containers/UserOperations';

import { withAddresses, withAddOrEditAddress, withDeleteAddress } from './AddressOperations';
import AddressesView from '../components/AddressesView';

const Addresses = props => {
  // console.log('props', props);
  return <PageLayout>{!props.loading && <AddressesView {...props} />}</PageLayout>;
};

Addresses.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  withCurrentUser,
  withAddresses,
  withAddOrEditAddress,
  withDeleteAddress,
  translate('addresses')
)(Addresses);
