import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';

import {
  Icon,
  PageLayout,
  NextButton,
  AddButton,
  MetaTags,
  Row,
  Col,
  Card,
  Empty,
  Divider,
  Spinner
} from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';

import { displayDataCheck } from '@gqlapp/listing-client-react/components/functions';
import ROUTES from '../routes';

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

const CheckoutCartView = props => {
  const [checkout, setCheckout] = React.useState(false);

  const { t, history, cartLoading, onSubmit, getCart, onDelete, currentUser, onEdit } = props;

  const cartLength = getCart && getCart.length;

  return (
    <PageLayout>
      <MetaTags title="Cart" description="meta" />

      {cartLoading && <Spinner />}
      {!cartLoading &&
        (getCart && getCart.orderDetails.length > 0 ? (
          <div>
            <Row type="flex">
              <Col span={24} align="center">
                <CheckoutStepsComponent step={0} t={t} />
                <br />
                <br />
              </Col>
              <Col span={24}>
                <Row type="flex" justify="center" align="middle">
                  <Col lg={8} md={8} xs={24}>
                    <h2>
                      <Icon type="ShoppingOutlined" />
                      {t('checkoutCart.myCart')} {cartLength} items
                    </h2>
                  </Col>
                  <Col lg={8} md={8} xs={24}>
                    <h2>
                      {t('checkoutCart.orderId')}
                      {displayDataCheck(getCart.id)}
                    </h2>
                  </Col>
                  <Col lg={8} md={8} xs={24}>
                    <h2>
                      {t('checkoutCart.totalPrice')}
                      <strong>&#8377; {TotalPrice(displayDataCheck(getCart.orderDetails))} </strong>
                    </h2>
                  </Col>
                  <Col span={24}>
                    <br />
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xxl={16} lg={16} xs={24}>
                    {getCart &&
                      getCart.orderDetails.map(cartItem => (
                        <Row>
                          <Col span={24}>
                            <CartItemComponent
                              t={t}
                              item={cartItem}
                              edit={true}
                              onSubmit={onSubmit}
                              onDelete={onDelete}
                              currentUser={currentUser}
                              onEdit={onEdit}
                            />
                            <Divider />
                          </Col>
                        </Row>
                      ))}
                  </Col>
                  <Col lg={8} sm={24} xs={24}>
                    <Card>
                      <Checkbox onChange={e => setCheckout(e.target.checked)}>{t('checkoutCart.checkbox')}</Checkbox>
                      <br />
                      <br />
                      <NextButton onClick={() => history.push(`${ROUTES.checkoutBill}`)} block disabled={!checkout}>
                        {t('checkoutCart.btn.checkout')}
                      </NextButton>
                      <br />
                      <br />
                      <Link className="listing-link" to={`${LISTING_ROUTES.listingCatalogue}`} target="_blank">
                        <AddButton ghost block>
                          {t('checkoutCart.btn.add')}
                        </AddButton>
                      </Link>
                      <br />
                      <br />
                      <hr />
                      <br />
                      <h2>
                        <u>{t('checkoutCart.cartSummary')}</u>
                      </h2>
                      <br />
                      <span>
                        {getCart.orderDetails.map((item, key) => (
                          <div key={key}>
                            <strong>
                              {t('checkoutCart.item')}
                              {key + 1}:
                            </strong>
                            <p>
                              {t('checkoutCart.price')}
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
                          {t('checkoutCart.totalAmount')}
                          <ColorFloat>&#8377; {` ${TotalPrice(displayDataCheck(getCart.orderDetails))}`}</ColorFloat>
                        </h3>
                      </span>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="centerAlign marginT30">
            <Empty description="You have no items in your Cart">
              <Link to={`${LISTING_ROUTES.listingCatalogue}`}>
                <AddButton style={{ width: 'fit-content' }}>{t('checkoutCart.btn.add')}</AddButton>
              </Link>
            </Empty>
          </div>
        ))}
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  history: PropTypes.object,
  getCart: PropTypes.object,
  currentUser: PropTypes.object,
  cartLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  t: PropTypes.func
};

export default CheckoutCartView;
