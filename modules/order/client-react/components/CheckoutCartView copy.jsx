import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import { Link } from 'react-router-dom';
import { Row, Col, Button, Card, Icon, Checkbox, Empty, Divider, Spin } from 'antd';
// import AvailDiscount from '@gqlapp/discounts-client-react/containers/AvailDiscount';
import settings from '../../../../settings';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import CartItemComponent from './CartItemComponent';
// import { TotalAmount, TotalRent, Refund } from '../helper/index';

import { AGREEMENT } from '../constants/Undertaking';

const CheckoutDiv = styled.div`
  padding: 20px 8%;
`;

const font14 = styled.div`
  font-size: 14px;
`;

const Margin20Col = styled(Col)`
  margin: 20px 0;
`;

const Margin20Button = styled(Button)`
  margin: 20px 0;
`;

const Margin20BoxShadowThemeCard = styled(Card)`
  box-shadow: 0 0 8px 4px rgba(49, 196, 167, 0.05);
`;

const MarginV15 = styled(Col)`
  margin: 15px 0 !important;
`;

const Font11h = styled.span`
  font-size: 11.5px;
`;

const MarginB20btn = styled(Button)`
  margin-bottom: 20px;
`;

const CartSumh2 = styled.h2`
  text-shadow: 0.5px 0 0;
  font-size: 19px;
`;

const Font12 = styled.div`
  font-size: 12px;
`;

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
    cartArray.map((item, key) => {
      totalCartPrice += item.cost * item.quantity;
    });
  return totalCartPrice;
}

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Cart`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutCartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: !this.props.loading && this.props.order ? this.props.order : null,
      loading: this.props.loading,
      cartItem: null,
      books: [],
      randomVal: 2000,
      checkout: false
    };
    this.onChange = this.onChange.bind(this);
  }

  // cartItemSelect(id) {
  //   var cart = this.state.cart;
  //   startDate = 'aaaaa';
  //   endDate = 'bbbbb';
  //   for (i in range(cart.orderDetails.length)) {
  //     if (cart.orderDetails[i].id === id) {
  //       cart.orderDetails[i].startDate = startDate;
  //       cart.orderDetails[i].endDate = endDate;

  //       this.setState({ cart: cart });
  //     }
  //   }
  //   var i;
  //   let item = this.props.state.products;
  //   item.some(item => {
  //     if (item.id === id) {
  //       this.setState({
  //         cartItem: item
  //       });
  //     }
  //   });
  //   this.props.setModal1Visible();
  // }

  onChange(e) {
    this.setState({
      checkout: e.target.checked
    });
  }

  // getValue() {
  //   let refundValue = 0;
  //   this.props.state.products.map(k => {
  //     refundValue = refundValue + k.refund;
  //   });
  //   return refundValue;
  // }

  render() {
    const { history, navigation, onSubmit, loading } = this.props;
    const getCart = this.props.order;

    const cartLength = getCart && getCart.orderDetails && getCart.orderDetails.length;

    return (
      <PageLayout>
        {renderMetaData()}
        {// !this.props.loading &&
        !loading ? (
          getCart && getCart.orderDetails.length > 0 ? (
            <CheckoutDiv>
              <Row>
                <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
                  <CheckoutStepsComponent step={0} />
                </Col>
                {!loading ? (
                  <MarginV15 lg={{ span: 23, offset: 1 }} xs={{ span: 24, offset: 0 }}>
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
                    {/* {console.log('this.props.mobile', this.props.isMobile)} */}
                    <Row gutter={24}>
                      <Col lg={{ span: 16, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        {getCart.orderDetails.map(cartItem => (
                          <>
                            <CartItemComponent
                              item={cartItem}
                              onEditItem={onSubmit}
                              deleteProduct={this.props.deleteOrderDetail}
                              mobile={this.props.isMobile}
                            />
                            <Divider />
                          </>
                        ))}
                      </Col>
                      <Col lg={{ span: 8, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <Card>
                          <MarginV15 span={24}>
                            <Checkbox onChange={e => this.onChange(e)}>
                              <Font11h>
                                <b>{AGREEMENT}</b>
                              </Font11h>
                            </Checkbox>
                          </MarginV15>
                          {this.state.checkout ? (
                            <Margin20Button onClick={() => history.push('/checkout-bill/')} type="primary" block>
                              Next
                              <Icon type="arrow-right" />
                            </Margin20Button>
                          ) : (
                            <Margin20Button type="primary" disabled block>
                              Checkout
                              <Icon type="arrow-right" />
                            </Margin20Button>
                          )}
                          <Link className="listing-link" to={`/listing_catalogue`} target="_blank">
                            <MarginB20btn type="primary" ghost block>
                              <Icon type="plus-circle" />
                              Add more products
                            </MarginB20btn>
                          </Link>
                          <hr />
                          <h2>
                            <u>Cart Summary</u>
                          </h2>
                          <br />
                          <Font12>
                            {getCart.orderDetails.map((item, key) => (
                              <div key={key}>
                                <strong>Item {key + 1}:</strong>
                                <p>
                                  Price{' '}
                                  <Rightfloat>
                                    &#8377;{' '}
                                    {item.cost && item.cost !== '0'
                                      ? `${item.cost} X ${item.quantity} = ${item.cost * item.quantity}`
                                      : 'Free'}
                                  </Rightfloat>
                                  <br />
                                </p>
                              </div>
                            ))}
                            <hr />
                            <br />
                            <h3>
                              Total amount
                              <ColorFloat>&#8377; {` ${TotalPrice(getCart.orderDetails)}`}</ColorFloat>
                            </h3>
                          </Font12>
                        </Card>
                      </Col>
                    </Row>
                  </MarginV15>
                ) : (
                  <div align="center">
                    <Spin />
                  </div>
                )}
              </Row>
            </CheckoutDiv>
          ) : (
            <div className="width100 centerAlign marginT30">
              <Empty description="You have no items in your Cart">
                <Link to="/listing_catalogue">
                  <Button style={{ width: 'fit-content' }} type="primary">
                    <Icon type="plus-circle" />
                    Add some products
                  </Button>
                </Link>
              </Empty>
            </div>
          )
        ) : (
          <div align="center">
            <Spin />
          </div>
        )}
      </PageLayout>
    );
  }
}
