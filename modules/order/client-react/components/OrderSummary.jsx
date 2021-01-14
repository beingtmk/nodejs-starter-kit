import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col } from '@gqlapp/look-client-react';
import { displayDataCheck, priceCommaSeparator } from '@gqlapp/listing-client-react';

import { TotalPrice } from './function';

const OrderSummary = props => {
  const { getCart, btn } = props;

  return (
    <Card type="inner" title={<h3 style={{ marginBottom: '0px' }}>ORDER SUMMARY</h3>}>
      <Row>
        <Col span={12} align="left">
          <h3>Items</h3>
        </Col>
        <Col span={12} align="end">
          {getCart && getCart.orderDetails.length}
        </Col>
        <Col span={12} align="left">
          <h3>Discount</h3>
        </Col>
        <Col span={12} align="end">
          &#8377; bleh
        </Col>
        <Col span={12} align="left">
          <h3>Shipping</h3>
        </Col>
        <Col span={12} align="end">
          <h3>FREE</h3>
        </Col>
        <Col span={24}>
          <br />
          <hr />
          <br />
        </Col>
        <Col span={12} align="left">
          <h2>TOTAL COST</h2>
        </Col>
        <Col span={12} align="end">
          <h3>&#8377; {` ${priceCommaSeparator(TotalPrice(displayDataCheck(getCart.orderDetails)))}`}</h3>
        </Col>
      </Row>
      {btn}
    </Card>
  );
};

OrderSummary.propTypes = {
  getCart: PropTypes.object,
  btn: PropTypes.node
};

export default OrderSummary;
