import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { NO_IMG } from '@gqlapp/listing-common';

import AddToCartView from '../components/AddToCartView';
import { withAddToCart } from './OrderOperations';

import ROUTES from '../routes';

const AddToCart = props => {
  const { history, currentUser, listing, addToCart } = props;

  const onSubmit = async (values, redirect = false) => {
    const max = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
    const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
    const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
    const discount =
      listing &&
      listing.listingCostArray &&
      listing.listingCostArray.length > 0 &&
      listing.listingCostArray[0].discount;
    const image = listing && listing.listingMedia && listing.listingMedia.filter(lM => lM.type === 'image');
    const imageUrl = (image && image.length > 0 && image[0].url) || NO_IMG;

    if (!currentUser) {
      history.push(`/login?redirectBack=${history && history.location && history.location.pathname}`);
      return null;
    }

    if (values.quantity > max || values.quantity <= 0) {
      message.error('Invalid quantity!');
      return null;
    }
    if (values.quantity <= max && values.quantity > 0) {
      const input = {
        consumerId: currentUser && currentUser.id,
        orderDetail: {
          vendorId: listing && listing.user && listing.user.id,
          modalName: 'listing',
          modalId: listing && listing.id,

          title: listing && listing.title,
          imageUrl,
          cost: isDiscount ? parseInt(cost && (cost - cost * (discount / 100)).toFixed()) : parseInt(cost.toFixed(2)),
          orderOptions: {
            quantity: values.quantity
          }
        }
      };

      try {
        // console.log('input', input);
        await addToCart(input);
        if (redirect) {
          history.push(`${ROUTES.checkoutCart}`);
        }
      } catch (e) {
        message.error('Failed!');
        throw new Error(e);
      }

      // Add Message
      message.success('Success! Complete your Order.');
    }
  };

  // console.log('AddToCart, props', props);
  return <AddToCartView onSubmit={onSubmit} {...props} />;
};

AddToCart.propTypes = {
  history: PropTypes.object,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  addToCart: PropTypes.func
};

export default compose(withAddToCart, translate('orders'))(AddToCart);
