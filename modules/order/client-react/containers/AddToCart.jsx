import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
// eslint-disable-next-line import/no-named-default
import { default as USER_ROUTES } from '@gqlapp/user-client-react/routes';
import { MODAL } from '@gqlapp/review-common';

import AddToCartView from '../components/AddToCartView';
import { withAddToCart, withGetCart, withDeleteCartItem } from './OrderOperations';

import ROUTES from '../routes';
import { subscribeToCart } from './OrderSubscriptions';

const AddToCart = props => {
  const { history, currentUser, listing, addToCart, deleteOrderDetail, subscribeToMore, getCart } = props;

  useEffect(() => {
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => subscribe();
  });

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
      history.push(`${USER_ROUTES.login}?redirectBack=${history && history.location && history.location.pathname}`);
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
          modalName: MODAL[1].value,
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

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      message.error('Removed from Cart.');
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('AddToCart, props', props);
  return <AddToCartView onSubmit={onSubmit} onDelete={handleDelete} {...props} />;
};

AddToCart.propTypes = {
  history: PropTypes.object,
  listing: PropTypes.object,
  currentUser: PropTypes.object,
  getCart: PropTypes.object,
  addToCart: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  subscribeToMore: PropTypes.func
};

export default compose(withAddToCart, withGetCart, withDeleteCartItem, translate('orders'))(AddToCart);
