import React from 'react';
import PropTypes from 'prop-types';
import { Message } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import CheckoutBillView from '../components/CheckoutBillView';
import { withCurrentUser, withGetCart, withPatchAddress } from './OrderOperations';
import { subscribeToCart } from './OrderSubscriptions';

const CheckoutBill = props => {
  const { history, patchAddress, subscribeToMore, getCart } = props;
  const [addressId, setAddressId] = React.useState(0);

  React.useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, history);
    return () => subscribe();
  });

  async function onSubmit() {
    try {
      const addressMutation = await patchAddress(addressId);
      if (history && addressMutation) {
        return history.push(`${ROUTES.checkoutOrderLink}${props.getCart.id}`);
      } else {
        Message.error('Try again!!');
      }
    } catch (e) {
      throw Error(e);
    }
  }

  // console.log('props', props);
  return <CheckoutBillView onSubmit={onSubmit} btnDisabled={addressId === 0} onSelect={setAddressId} {...props} />;
};

CheckoutBill.propTypes = {
  getCart: PropTypes.object,
  addresses: PropTypes.object,
  patchAddress: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object
};

export default compose(withCurrentUser, withGetCart, withPatchAddress)(translate('order')(CheckoutBill));
