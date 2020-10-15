import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Icon, Checkbox, Empty, Divider } from 'antd';

import { PageLayout, NextButton, AddButton, MetaTags } from '@gqlapp/look-client-react';
// eslint-disable-next-line import/no-named-default
import { default as LISTING_ROUTES } from '@gqlapp/listing-client-react/routes';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

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

  const { history, cartLoading, onSubmit, getCart, onDelete, currentUser, onEdit } = props;

  const cartLength = getCart && getCart.length;

  return (
    <PageLayout>
      <MetaTags title="Cart" description="meta" />

      {cartLoading && <Spinner />}
      {!cartLoading &&
        (getCart && getCart.orderDetails.length > 0 ? (
          <div>
            <Row>
              <Col xl={{ span: 24, offset: 0 }} lg={24} xs={{ span: 24, offset: 0 }} align="center">
                <CheckoutStepsComponent step={0} />
              </Col>
              <Col lg={{ span: 23, offset: 1 }} xs={{ span: 24, offset: 0 }}>
                <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 5 }}>
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
                        <>
                          <CartItemComponent
                            item={cartItem}
                            edit={true}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            currentUser={currentUser}
                            onEdit={onEdit}
                          />
                          <Divider />
                        </>
                      ))}
                  </Col>
                  <Col lg={{ span: 8, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                    <Card>
                      <Checkbox onChange={e => setCheckout(e.target.checked)}>
                        I HAVE READ AND AGREE TO ALL THE PRIVACY POLICY.
                      </Checkbox>
                      <br />
                      <br />
                      <NextButton onClick={() => history.push(`${ROUTES.checkoutBill}`)} block disabled={!checkout}>
                        Checkout
                      </NextButton>
                      <br />
                      <br />
                      <Link className="listing-link" to={`${LISTING_ROUTES.listingCatalogue}`} target="_blank">
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
              <Link to={`${LISTING_ROUTES.listingCatalogue}`}>
                <AddButton style={{ width: 'fit-content' }}>Add some products</AddButton>
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
  onEdit: PropTypes.func
};

export default CheckoutCartView;
