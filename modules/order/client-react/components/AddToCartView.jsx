import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'antd';

import AddToCartForm from './AddToCartForm';

const AddToCartView = props => {
  const { currentUser, listing, onSubmit, showBtn } = props;
  const listingOwned = (listing && listing.user && listing.user.id) === (currentUser && currentUser.id);
  return (
    <Card>
      <AddToCartForm
        currentUser={currentUser}
        onSubmit={onSubmit}
        max={listing && listing.listingDetail && listing.listingDetail.inventoryCount}
        fixedQuantity={listing && listing.listingOptions && listing.listingOptions.fixedQuantity}
        listingOwned={listingOwned}
        showBtn={showBtn}
      />
    </Card>
  );
};

AddToCartView.propTypes = {
  onSubmit: PropTypes.func,
  showBtn: PropTypes.bool,
  currentUser: PropTypes.object,
  listing: PropTypes.object
};

export default AddToCartView;
