import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import { NO_IMG } from '@gqlapp/listing-common';
import { EditIcon, DeleteIcon, Row, Col, Card } from '@gqlapp/look-client-react';
import ReviewStar from '@gqlapp/review-client-react/containers/ReviewStar';
import DiscountComponent from '@gqlapp/discount-client-react/containers/DiscountComponent';
import { MODAL } from '@gqlapp/review-common';

import ROUTES from '../routes';

const Align = styled.div`
  position: absolute;
  right: 35px;
  bottom: 45px;
  z-index: 1;
`;

const ListingItemComponent = props => {
  const { item, loading, deleteProduct, currentUser } = props;
  const listing_media =
    item && item.listingMedia && item.listingMedia.length > 0 && item.listingMedia.filter(lM => lM.type === 'image');

  return (
    !loading && (
      <>
        <Align>
          <Row type="flex" justify="space-around" align="middle" gutter={12}>
            <Col span={12}>
              <Link className="listing-link" to={`${ROUTES.editLink}${item.id}`}>
                <EditIcon />
              </Link>
            </Col>
            {deleteProduct && (
              <Col span={12}>
                <DeleteIcon onClick={() => deleteProduct(item.id)} title="Are you sure delete this listing?" />
              </Col>
            )}
          </Row>
        </Align>
        <Link to={`${ROUTES.listingDetailLink}${item.id}`}>
          <Card
            hoverable
            bodyStyle={{
              padding: '0px'
            }}
          >
            <Row gutter={24} type="flex" justify="space-around">
              <Col xs={{ span: 24 }} md={{ span: 9 }} xl={{ span: 6 }} align="center" style={{ maxHeight: '200px' }}>
                <img
                  alt=""
                  src={(listing_media.length > 0 && listing_media[0].url) || NO_IMG}
                  style={{
                    height: '-webkit-fill-available'
                  }}
                />
              </Col>
              <Col xs={{ span: 24 }} md={{ span: 15 }} xxl={{ span: 18 }}>
                <Col lg={0} md={0} xs={2} />
                <Col lg={24} md={24} xs={22}>
                  <br />
                  <h2>{item.title}</h2>
                  <ReviewStar
                    filter={{
                      isActive: true,
                      modalId: item && item.id,
                      modalName: MODAL[1].value
                    }}
                    currentUser={currentUser}
                  />
                  <Col lg={24} md={24} xs={0}>
                    <br />
                    <br />
                    <br />
                  </Col>
                  <DiscountComponent
                    modalId={item && item.id}
                    modalName={MODAL[1].value}
                    cost={item.listingCostArray[0].cost}
                  />
                </Col>
                <Col lg={0} md={0} xs={24}>
                  <br />
                  <br />
                  <br />
                </Col>
              </Col>
            </Row>
          </Card>
        </Link>
      </>
    )
  );
};

ListingItemComponent.propTypes = {
  item: PropTypes.object,
  currentUser: PropTypes.object,
  deleteProduct: PropTypes.func,
  history: PropTypes.object,
  loading: PropTypes.bool,
  t: PropTypes.func
};

export default ListingItemComponent;
