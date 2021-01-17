import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { Row, Col, Card, Button, Icon } from '@gqlapp/look-client-react';
import { NO_IMG } from '@gqlapp/listing-common';
// eslint-disable-next-line import/no-named-default
import { LISTING_ROUTES } from '@gqlapp/listing-client-react';

import ROUTES from '../routes';

const ListingCartItemComponent = props => {
  const { /* t, */ item } = props;

  // console.log('cart item', props);
  return (
    <Card>
      <Row align="middle">
        <Col span={1} />
        <Col span={20}>
          <Link target="_blank" to={`${LISTING_ROUTES.listingDetailLink}${item.modalId}`}>
            <Row gutter={24} type="flex" align="middle">
              <Col
                span={5}
                align="center"
                style={{
                  height: 'fit-content'
                }}
              >
                <img alt="" src={item.imageUrl || NO_IMG} width="100%" />
              </Col>
              <Col span={19}>
                <h3>
                  <strong>{item.title}</strong>
                </h3>
                <h4 style={{ marginBottom: '0px' }}>
                  Qty: &nbsp;
                  <strong>{item.orderOptions.quantity}</strong>
                </h4>
                <h4 style={{ marginBottom: '0px' }}>
                  Price (per unit):&nbsp;
                  <strong>&#8377; {item.cost}</strong>
                </h4>
                <h4 style={{ marginBottom: '0px' }}>
                  Total:&nbsp;
                  <strong>&#8377; {item.cost * item.orderOptions.quantity}</strong>
                </h4>
              </Col>
            </Row>
          </Link>
        </Col>
        <Col span={2}>
          <br />
          <br />
          <br />
          <div style={{ display: 'flex', float: 'right' }}>
            <Link to={`${ROUTES.checkoutCart}`}>
              <Button color="danger" size="md" shape="circle">
                <Icon type="DeleteOutlined" />
              </Button>
            </Link>
          </div>
        </Col>
        <Col span={1} />
      </Row>
    </Card>
  );
};

ListingCartItemComponent.propTypes = {
  item: PropTypes.object,
  t: PropTypes.func
};

export default ListingCartItemComponent;
