import React from 'react';
import { PropTypes } from 'prop-types';
import { Card } from 'antd';

import AddToCartForm from './AddToCartForm';

const AddToCartView = props => {
  const { currentUser, listing, onSubmit } = props;
  return (
    <Card>
      <AddToCartForm
        currentUser={currentUser}
        onSubmit={onSubmit}
        max={listing && listing.listingDetail && listing.listingDetail.inventoryCount}
      />
    </Card>
  );
};

AddToCartView.propTypes = {
  onSubmit: PropTypes.func,
  currentUser: PropTypes.object,
  listing: PropTypes.object
};

export default AddToCartView;
