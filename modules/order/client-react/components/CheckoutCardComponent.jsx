import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { NextButton, Col, Row, Card, Divider } from '@gqlapp/look-client-react';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import CartItemComponent from './CartItemComponent';
import { TotalPrice } from './CheckoutCartView';

const StatusText = styled.div`
  color: ${props => props.status === 'completed' && '#2aa952'};
  color: ${props => props.status === 'initiated' && '#F79E1B'};
  color: ${props => props.status === 'cancelled' && 'red'};
`;

const CheckoutCardComponent = props => {
  const { getCart, SubmitButton, product, showBtn, btnDisabled, onSubmit, buttonText, showState, t } = props;

  return (
    <Card align="left" style={{ height: '100%' }}>
      <Row>
        <Col span={12}>
          <h3 className="OrderHead">{t('checkoutCard.orderSummary')}</h3>
        </Col>
        {showState && (
          <Col span={12} align="right">
            <h3>
              <StatusText status={getCart.orderState && getCart.orderState.state.toLowerCase()}>
                {getCart.orderState && displayDataCheck(getCart.orderState.state)}
              </StatusText>
            </h3>
          </Col>
        )}
      </Row>
      <br />
      <hr />
      <br />
      {getCart &&
        getCart.orderDetails &&
        getCart.orderDetails.length !== 0 &&
        getCart.orderDetails.map((item, key) => (
          <Row>
            <Col span={24}>
              <CartItemComponent inner={true} key={key} item={item} t={t} />
              <Divider />
            </Col>
          </Row>
        ))}
      <hr />
      <br />
      <h3 className="OrderHead">
        <u>{t('checkoutCard.cartSummary')}</u>
      </h3>
      {/* {paid === true ? (
          <h3 className="lightText">
            Total amount{' '}
            <strong className="rightfloat">
              &#8377;
              {` ${TotalPrice(getCart && getCart.orderDetails.length !== 0 && getCart.orderDetails)}`}
            </strong>
          </h3>
        ) : ( */}
      <br />
      <div style={{ lineHeight: '12px' }}>
        <h3 className="rentAmount">
          {t('checkoutCard.total')}
          <h2 style={{ float: 'right' }}>
            &#8377;
            {` ${TotalPrice(getCart && getCart.orderDetails.length !== 0 && displayDataCheck(getCart.orderDetails))}`}
          </h2>
        </h3>
      </div>
      {/* )} */}
      {getCart.paid === true ? (
        <h4 className="lightText">
          {t('checkoutCard.youPaid')}
          <strong className="colorFloat"> &#8377; {TotalPrice(getCart)}</strong>
          <h6 className="PaidMethodColor">{displayDataCheck(product.youPaid.method)}</h6>
        </h4>
      ) : null}
      <br />
      <div align="right">
        {showBtn &&
          (SubmitButton ? (
            <SubmitButton />
          ) : (
            <NextButton onClick={onSubmit} disabled={btnDisabled} size="lg">
              {displayDataCheck(buttonText)}
            </NextButton>
          ))}
      </div>
    </Card>
  );
};

CheckoutCardComponent.propTypes = {
  getCart: PropTypes.object,
  SubmitButton: PropTypes.Component,
  product: PropTypes.object,
  showBtn: PropTypes.bool,
  showState: PropTypes.bool,
  btnDisabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  t: PropTypes.func
};

export default CheckoutCardComponent;
