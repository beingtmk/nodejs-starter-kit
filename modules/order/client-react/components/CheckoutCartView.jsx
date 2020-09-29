import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Icon, Checkbox, Empty } from 'antd';

import { PageLayout, NextButton, AddButton } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";

import settings from '../../../../settings';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import CartItemComponent from './CartItemComponent';

const Rightfloat = styled.div`
  float: right;
`;

const ColorFloat = styled.strong`
  float: right;
  color: #3f0869;
`;

export function TotalPrice(cartArray) {
  var totalCartPrice = 0;
  // console.log('cart array', cartArray);
  cartArray &&
    cartArray.map(item => {
      totalCartPrice += item.cost * (item.orderOptions && item.orderOptions.quantity);
    });
  return totalCartPrice;
}

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Cart`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

const CheckoutCartView = props => {
  const [checkout, setCheckout] = React.useState(false);

  const { history, cartLoading, onSubmit, getCart, onDelete } = props;

  const cartLength = getCart && getCart.length;

  return (
    <PageLayout>
      {renderMetaData()}
      {console.log('props', props)}
      {// !props.loading &&
      !cartLoading && getCart && getCart.orderDetails.length > 0 ? (
        <div>
          <Row>
            <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
              <CheckoutStepsComponent step={0} />
            </Col>
            <Col lg={{ span: 23, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Col span={24}>
                <Col lg={{ span: 8 }} xs={{ span: 24, offset: 0 }}>
                  <h2>
                    <Icon type="shopping" />
                    {' My cart - '} {cartLength} items
                  </h2>
                </Col>
                <Col lg={{ span: 8 }} xs={{ span: 24, offset: 0 }}>
                  <h2>Order id - {getCart.id}</h2>
                </Col>
                <Col lg={{ span: 8 }} xs={{ span: 24, offset: 0 }}>
                  <h2>
                    Total price: <strong>&#8377; {TotalPrice(getCart.orderDetails)} </strong>
                  </h2>
                </Col>
                <Col lg={{ span: 8 }} xs={{ span: 24, offset: 0 }}>
                  <br />
                </Col>
              </Col>
              <br />
              <br />
              <Row gutter={24}>
                <Col lg={{ span: 16, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                  {getCart &&
                    getCart.orderDetails.map(cartItem => (
                      <CartItemComponent item={cartItem} edit={true} onSubmit={onSubmit} onDelete={onDelete} />
                    ))}
                </Col>
                <Col lg={{ span: 8, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                  <Card>
                    <Checkbox onChange={e => setCheckout(e.target.checked)}>
                      I HAVE READ AND AGREE TO ALL THE PRIVACY POLICY.
                    </Checkbox>
                    <br />
                    <br />
                    {checkout ? (
                      <NextButton onClick={() => history.push('/checkout-bill/')} block>
                        Next
                      </NextButton>
                    ) : (
                      <NextButton disabled block>
                        Checkout
                      </NextButton>
                    )}
                    <br />
                    <br />
                    <Link className="listing-link" to={`/listing_catalogue`} target="_blank">
                      <AddButton ghost block>
                        Add more products
                      </AddButton>
                    </Link>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <h2>
                      <u>Cart Summary</u>
                    </h2>
                    <br />
                    <span>
                      {getCart.orderDetails.map((item, key) => (
                        <div key={key}>
                          <strong>Item {key + 1}:</strong>
                          <p>
                            Price{' '}
                            <Rightfloat>
                              &#8377;{' '}
                              {item.cost && item.cost !== '0'
                                ? `${item.cost} X ${item.orderOptions.quantity} = ${item.cost *
                                    item.orderOptions.quantity}`
                                : 'Free'}
                            </Rightfloat>
                            <br />
                          </p>
                        </div>
                      ))}
                      <br />
                      <hr />
                      <br />
                      <h3>
                        Total amount
                        <ColorFloat>&#8377; {` ${TotalPrice(getCart.orderDetails)}`}</ColorFloat>
                      </h3>
                    </span>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="width100 centerAlign marginT30">
          <Empty description="You have no items in your Cart">
            <Link to="/listing_catalogue">
              <AddButton style={{ width: 'fit-content' }} type="primary">
                Add some products
              </AddButton>
            </Link>
          </Empty>
        </div>
      )}
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  history: PropTypes.object,
  getCart: PropTypes.object,
  cartLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func
};

export default CheckoutCartView;
