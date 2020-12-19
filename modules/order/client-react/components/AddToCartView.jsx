import React from 'react';
import { PropTypes } from 'prop-types';

import AddToCartForm from './AddToCartForm';

const AddToCartView = props => {
  const { currentUser, listing, onSubmit, onDelete, showBtn, item, getCart, cartLoading, t, catalogueCard } = props;
  const listingOwned = (listing && listing.user && listing.user.id) === (currentUser && currentUser.id);
  const cartItemArray = getCart ? getCart.orderDetails.filter(oD => oD.modalId === listing.id) : [];
  // console.log(listing, cartItemArray);
  return (
    <AddToCartForm
      t={t}
      currentUser={currentUser}
      onSubmit={onSubmit}
      max={
        (listing &&
          listing.listingOptions &&
          listing.listingOptions.fixedQuantity !== -1 &&
          listing.listingOptions.fixedQuantity) ||
        (listing && listing.listingDetail && listing.listingDetail.inventoryCount)
      }
      // fixedQuantity={listing && listing.listingOptions && listing.listingOptions.fixedQuantity}
      listingOwned={listingOwned}
      showBtn={showBtn}
      item={item}
      inCart={cartItemArray.length === 0}
      loading={cartLoading}
      catalogueCard={catalogueCard}
      onDelete={() => onDelete(cartItemArray[0].id)}
    />
  );
};

AddToCartView.propTypes = {
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  showBtn: PropTypes.bool,
  cartLoading: PropTypes.bool,
  catalogueCard: PropTypes.bool,
  currentUser: PropTypes.object,
  item: PropTypes.object,
  listing: PropTypes.object,
  getCart: PropTypes.object,
  t: PropTypes.func
};

export default AddToCartView;
