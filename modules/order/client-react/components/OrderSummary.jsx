import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col, NextButton, CheckBox } from '@gqlapp/look-client-react';
import { displayDataCheck, priceCommaSeparator } from '@gqlapp/listing-client-react/components/functions';

import ROUTES from '../routes';
import { TotalPrice } from './function';

const OrderSummary = props => {
  const [checkout, setCheckout] = React.useState(false);
  const { t, getCart, history } = props;

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
      <CheckBox onChange={e => setCheckout(e.target.checked)}>{t('checkoutCart.checkbox')}</CheckBox>
      <br />
      <br />
      <NextButton onClick={() => history.push(`${ROUTES.checkoutBill}`)} block disabled={!checkout}>
        {t('checkoutCart.btn.checkout')}
      </NextButton>
    </Card>
  );
};

OrderSummary.propTypes = {
  t: PropTypes.func,
  getCart: PropTypes.object,
  history: PropTypes.object
};

export default OrderSummary;
