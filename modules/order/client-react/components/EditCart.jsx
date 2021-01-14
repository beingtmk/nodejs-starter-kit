import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';
import { withListing } from '@gqlapp/listing-client-react';
import { withModalDiscount, subscribeToDiscount } from '@gqlapp/discount-client-react';

import AddToCartView from './AddToCartView';

const EditCart = props => {
  const {
    t,
    loading,
    listing,
    currentUser,
    modalId,
    discountSubscribeToMore,
    onEdit,
    item,
    hideModal,
    modalDiscount
  } = props;

  useEffect(() => {
    const subscribe = subscribeToDiscount(discountSubscribeToMore, modalId);
    return () => subscribe();
  }, [discountSubscribeToMore, modalId]);

  const handleSubmit = values => {
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
    onEdit(
      item.id,
      item.orderOptions && item.orderOptions.id,
      isDiscount ? parseInt(cost && (cost - cost * (discount / 100)).toFixed()) : parseInt(cost.toFixed(2)),
      values
    );
    hideModal();
  };

  // console.log(('props editcart', props));
  return (
    <>
      {loading && <Spinner size="small" />}
      {listing && (
        <AddToCartView
          t={t}
          currentUser={currentUser}
          onSubmit={handleSubmit}
          showBtn={false}
          listing={listing}
          item={item}
        />
      )}
    </>
  );
};

EditCart.propTypes = {
  listing: PropTypes.object,
  item: PropTypes.object,
  currentUser: PropTypes.object,
  modalDiscount: PropTypes.object,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  discountSubscribeToMore: PropTypes.func,
  t: PropTypes.func,
  hideModal: PropTypes.func,
  modalId: PropTypes.number
};

export default compose(withListing, withModalDiscount)(EditCart);
