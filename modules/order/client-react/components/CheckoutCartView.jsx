import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Heading,
  PageLayout,
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

import CheckoutStepsComponent from './CheckoutStepsComponent';
import OrderSummary from './OrderSummary';
import CartItemComponent from './CartItemComponent';

const CustomBody = styled.div`
  background: white;
  margin: 0 -200%;
  padding: 0 200%;
`;

const CheckoutCartView = props => {
  const { t, history, cartLoading, onSubmit, getCart, onDelete, currentUser, onEdit } = props;

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
              </Col>
              <Col span={24}>
                <CustomBody>
                  <br />
                  <Heading>Shopping Cart</Heading>
                  <br />
                  <Row gutter={24}>
                    <Col xxl={16} lg={16} xs={24}>
                      <Card
                        type="inner"
                        title={
                          <Row type="flex">
                            <Col span={12}>
                              <h3 style={{ marginBottom: '0px' }}>Product Details</h3>
                            </Col>
                            <Col span={12} style={{ display: 'flex' }}>
                              <Col span={7} align="center">
                                <h3 style={{ marginBottom: '0px' }}>Quantity</h3>
                              </Col>
                              <Col span={1} align="center" />
                              <Col span={8} align="center">
                                <h3 style={{ marginBottom: '0px' }}>Price</h3>
                              </Col>
                              <Col span={8} align="center">
                                <h3 style={{ marginBottom: '0px' }}>Total</h3>
                              </Col>
                            </Col>
                          </Row>
                        }
                        bodyStyle={{
                          padding: '0px'
                        }}
                      >
                        <br />
                        {getCart &&
                          getCart.orderDetails.map((cartItem, i) => (
                            <Row>
                              <Col span={24}>
                                <CartItemComponent
                                  modalId={cartItem.modalId}
                                  t={t}
                                  item={cartItem}
                                  edit={true}
                                  onSubmit={onSubmit}
                                  onDelete={onDelete}
                                  currentUser={currentUser}
                                  onEdit={onEdit}
                                />
                                {getCart.orderDetails.length - 1 !== i ? <Divider /> : <br />}
                              </Col>
                            </Row>
                          ))}
                      </Card>
                      <br />
                      <Link className="listing-link" to={`${LISTING_ROUTES.listingCatalogue}`} target="_blank">
                        <AddButton ghost block>
                          Continue Shopping
                        </AddButton>
                      </Link>
                    </Col>
                    <Col lg={8} sm={24} xs={24}>
                      <OrderSummary t={t} getCart={getCart} history={history} />
                    </Col>
                  </Row>
                  <br />
                  <br />
                  <br />
                </CustomBody>
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
