import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message } from '@gqlapp/look-client-react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
import { USER_ROUTES } from '@gqlapp/user-client-react';
import { MODAL } from '@gqlapp/review-common';
import { withModalDiscount, subscribeToDiscount } from '@gqlapp/discount-client-react';

import AddToCartView from '../components/AddToCartView';
import { withAddToCart, withGetCart, withDeleteCartItem } from './OrderOperations';

import ROUTES from '../routes';
import { subscribeToCart } from './OrderSubscriptions';

const AddToCart = props => {
  const {
    history,
    currentUser,
    listing,
    addToCart,
    deleteOrderDetail,
    subscribeToMore,
    discountSubscribeToMore,
    getCart,
    modalDiscount,
    modalId
  } = props;

  useEffect(() => {
    const subscribeDiscount = subscribeToDiscount(discountSubscribeToMore, modalId);
    const subscribe = subscribeToCart(subscribeToMore, getCart && getCart.id, {});
    return () => {
      () => subscribe();
      () => subscribeDiscount();
    };
  });

  const onSubmit = async (values, redirect = false) => {
    const max = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
    const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
    const now = new Date().toISOString();
    const startDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.startDate;
    const endDate = modalDiscount && modalDiscount.discountDuration && modalDiscount.discountDuration.endDate;
    const isDiscountPercent =
      startDate && endDate
        ? startDate <= now && endDate >= now && modalDiscount && modalDiscount.discountPercent > 0
        : modalDiscount && modalDiscount.discountPercent > 0;
    const discountPercent = isDiscountPercent ? modalDiscount && modalDiscount.discountPercent : null;
    const isDiscount = (listing && listing.listingFlags && listing.listingFlags.isDiscount) || isDiscountPercent;
    const discount =
      (listing &&
        listing.listingCostArray &&
        listing.listingCostArray.length > 0 &&
        listing.listingCostArray[0].discount) ||
      discountPercent;

    const image = listing && listing.listingMedia && listing.listingMedia.filter(lM => lM.type === 'image');
    const imageUrl = (image && image.length > 0 && image[0].url) || NO_IMG;

    if (!currentUser) {
      history.push(`${USER_ROUTES.login}?redirectBack=${history && history.location && history.location.pathname}`);
      return null;
    }

    if (values.quantity > max || values.quantity <= 0) {
      Message.error('Invalid quantity!');
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
        Message.error('Failed!');
        throw new Error(e);
      }

      // Add Message
      Message.success('Success! Complete your Order.');
    }
  };

  const handleDelete = id => {
    try {
      deleteOrderDetail(id);
      Message.error('Removed from Cart.');
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
  modalDiscount: PropTypes.object,
  addToCart: PropTypes.func,
  deleteOrderDetail: PropTypes.func,
  subscribeToMore: PropTypes.func,
  discountSubscribeToMore: PropTypes.func,
  modalId: PropTypes.number
};

export default compose(
  withAddToCart,
  withGetCart,
  withDeleteCartItem,
  withModalDiscount,
  translate('orders')
)(AddToCart);
