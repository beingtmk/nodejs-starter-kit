import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Badge, DeleteIcon, Row, Col, ModalDrawer, Icon } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';
import { NO_IMG } from '@gqlapp/listing-common';
import { MODAL } from '@gqlapp/review-common';
import { withListing } from '@gqlapp/listing-client-react/containers/ListingOperations';

import EditCartQuantity from './EditCartQuantity';
import EditCart from './EditCart';

const CartItemComponent = props => {
  const { loading, listing, t, item, onEdit, onDelete, currentUser } = props;
  const disable = listing && listing.listingOptions && listing.listingOptions.fixedQuantity !== -1;
  const maxQuantity = listing && listing.listingDetail && listing.listingDetail.inventoryCount;
  // console.log('cart item', props);
  return (
    <Row align="middle">
      <Col span={1} />
      <Col span={11}>
        <Link target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
          <Row gutter={24} type="flex" align="middle">
            <Col
              span={9}
              align="center"
              style={{
                height: 'fit-content'
              }}
            >
              <img alt="" src={item.imageUrl || NO_IMG} width="100%" />
            </Col>
            <Col span={15}>
              <h3>{item.title}</h3>
              {listing &&
                listing.listingHighlight &&
                listing.listingHighlight.length > 0 &&
                listing.listingHighlight.map(lH => (
                  <>
                    <Badge status="processing" text={lH.highlight} />
                    <br />
                  </>
                ))}
            </Col>
          </Row>
        </Link>
      </Col>
      <Col span={11} style={{ display: 'flex' }}>
        <Col span={7} align="center">
          {!loading && <EditCartQuantity item={item} disable={disable} maxQuantity={maxQuantity} t={t} />}
        </Col>
        <Col span={1} align="center">
          x
        </Col>
        <Col span={8} align="center">
          <h3 type="2" style={{ marginBottom: '0px' }}>
            &#8377; {` ${item.cost}`}
          </h3>
        </Col>
        <Col span={8} align="center">
          <h3 type="2" style={{ marginBottom: '0px' }}>
            &#8377; {` ${item.cost * item.orderOptions.quantity}`}
          </h3>
          <br />
          <br />
          <br />
          <Col span={24}>
            <div style={{ display: 'flex', float: 'right' }}>
              {onEdit && (
                <ModalDrawer
                  buttonText={<Icon type="EditOutlined" />}
                  modalTitle="Edit Item"
                  block={false}
                  height="auto"
                  shape="circle"
                  size="md"
                  type="default"
                >
                  <EditCart
                    modalId={item.modalId}
                    currentUser={currentUser}
                    modalName={MODAL[1].value}
                    onEdit={onEdit}
                    item={item}
                    t={t}
                  />
                </ModalDrawer>
              )}
              &nbsp; &nbsp;
              {onDelete && (
                <DeleteIcon
                  title="Are you sure to delete this order?"
                  onClick={() => props.onDelete(item.id)}
                  size="md"
                />
              )}
            </div>
          </Col>
        </Col>
      </Col>
      <Col span={1} />
    </Row>
  );
};

CartItemComponent.propTypes = {
  loading: PropTypes.bool,
  listing: PropTypes.object,
  item: PropTypes.object,
  currentUser: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSubmit: PropTypes.func,
  mobile: PropTypes.func,
  t: PropTypes.func
};

export default compose(withListing)(CartItemComponent);
