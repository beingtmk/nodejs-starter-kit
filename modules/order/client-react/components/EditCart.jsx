import React from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';

import { ModalDrawer, Icon, Spinner } from '@gqlapp/look-client-react';
import { withListing } from '@gqlapp/listing-client-react/containers/ListingOperations';

import AddToCartView from './AddToCartView';

const EditCart = props => {
  const { t, loading, listing, currentUser, onEdit, item } = props;

  const handleSubmit = values => {
    const cost = listing && listing.listingCostArray && listing.listingCostArray[0].cost;
    const isDiscount = listing && listing.listingFlags && listing.listingFlags.isDiscount;
    const discount =
      listing &&
      listing.listingCostArray &&
      listing.listingCostArray.length > 0 &&
      listing.listingCostArray[0].discount;
    onEdit(
      item.id,
      item.orderOptions && item.orderOptions.id,
      isDiscount ? parseInt(cost && (cost - cost * (discount / 100)).toFixed()) : parseInt(cost.toFixed(2)),
      values
    );
  };

  // console.log(('props editcart', props));
  return (
    <ModalDrawer
      buttonText={<Icon type="EditOutlined" />}
      modalTitle="Edit Item"
      height="auto"
      shape="circle"
      size="large"
      type="default"
      stype={{ width: '0px' }}
    >
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
    </ModalDrawer>
  );
};

EditCart.propTypes = {
  listing: PropTypes.object,
  item: PropTypes.object,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  onEdit: PropTypes.func,
  t: PropTypes.func
};

export default compose(withListing)(EditCart);
