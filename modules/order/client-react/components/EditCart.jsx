import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { compose } from '@gqlapp/core-common';

import { Modal, EditIcon } from '@gqlapp/look-client-react';
import { withListing } from '@gqlapp/listing-client-react/containers/ListingOperations';

import AddToCartView from './AddToCartView';

const EditCart = props => {
  const { loading, listing, currentUser, onEdit, item } = props;
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
    setVisible(false);
  };

  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <EditIcon color="default" onClick={() => setVisible(true)} size="lg" />
      <Modal
        visible={visible}
        title="Edit Item"
        okText="Save"
        footer={null}
        onCancel={() => setVisible(false)}
        // onOk={() => setVisible(false)}
      >
        {loading && (
          <div align="center">
            <br />
            <br />
            <Spin />
          </div>
        )}
        {listing && (
          <AddToCartView currentUser={currentUser} onSubmit={handleSubmit} showBtn={false} listing={listing} />
        )}
      </Modal>
    </>
  );
};

EditCart.propTypes = {
  listing: PropTypes.object,
  item: PropTypes.object,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  onEdit: PropTypes.func
};

export default compose(withListing)(EditCart);
