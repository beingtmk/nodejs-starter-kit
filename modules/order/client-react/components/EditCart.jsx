import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';

import { compose } from '@gqlapp/core-common';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import { Modal, EditIcon, Row, Col } from '@gqlapp/look-client-react';
import { withListing } from '@gqlapp/listing-client-react/containers/ListingOperations';

import AddToCartView from './AddToCartView';

const EditCart = props => {
  const { t, loading, listing, currentUser, onEdit, item } = props;
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleDrawer, setVisibleDrawer] = React.useState(false);

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
    setVisibleModal(false);
  };

  // console.log(('props editcart', props));
  return (
    <Row type={'flex'}>
      <Col lg={24} md={24} xs={0}>
        <EditIcon color="default" onClick={() => setVisibleModal(true)} size="lg" />
        <Modal
          visible={visibleModal}
          title="Edit Item"
          okText="Save"
          footer={null}
          onCancel={() => setVisibleModal(false)}
          // onOk={() => setVisibleModal(false)}
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
        </Modal>
      </Col>
      <Col lg={0} md={0} xs={24}>
        <EditIcon color="default" onClick={() => setVisibleDrawer(true)} size="lg" />
        <Drawer
          height={'auto'}
          title="Edit Item"
          placement={'bottom'}
          closable={true}
          onClose={() => setVisibleDrawer(false)}
          visible={visibleDrawer}
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
        </Drawer>
      </Col>
    </Row>
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
