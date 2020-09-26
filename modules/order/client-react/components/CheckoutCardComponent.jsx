import React from 'react';
import { Row, Col, Icon, Button, Card, Divider } from 'antd';

import CartItemComponent from './CartItemComponent';
import { TotalPrice } from './CheckoutCartView';

export default class OrderCardComponent extends React.Component {
  getTotalRent() {
    // console.log(this.props);
    var rent = 0;
    const cartItems = this.props.cartItems
      ? this.props.cartItems
      : this.props.getCart && this.props.getCart.event.length !== 0 && this.props.getCart.event;
    for (var item in cartItems) {
      rent += item.rentPerDay * (item.startDate - item.endDate);
    }
    return rent;
  }
  render() {
    const SubmitButton = this.props.SubmitButton;
    const getCart = this.props.getCart;
    return (
      <Card align="left" style={{ height: '100%' }}>
        <h3 className="OrderHead">Order summary</h3>
        <hr />
        <br />
        {getCart &&
          getCart.orderDetails &&
          getCart.orderDetails.length !== 0 &&
          getCart.orderDetails.map((item, key) => (
            <>
              <CartItemComponent inner={true} key={key} item={item} />
              <Divider />
            </>
          ))}
        <hr />
        <br />
        <h3 className="OrderHead">
          <u>Cart Summary</u>
        </h3>
        {/* {this.props.paid === true ? (
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
            Total amount
            <h2 style={{ float: 'right' }}>
              &#8377;
              {` ${TotalPrice(getCart && getCart.orderDetails.length !== 0 && getCart.orderDetails)}`}
            </h2>
          </h3>
        </div>
        {/* )} */}
        {getCart.paid === true ? (
          <h4 className="lightText">
            You paid <strong className="colorFloat"> &#8377; {TotalPrice(getCart)}</strong>
            <h6 className="PaidMethodColor">{this.props.product.youPaid.method}</h6>
          </h4>
        ) : null}
        <br />
        <div align="right">
          {this.props.showBtn &&
            (SubmitButton ? (
              <SubmitButton />
            ) : (
              <Button type="primary" onClick={this.props.onSubmit} disabled={this.props.btnDisabled} size="large">
                {this.props.buttonText}
                <Icon type="arrow-right" />
              </Button>
            ))}
        </div>
      </Card>
    );
  }
}
