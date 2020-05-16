import React from 'react';
import { Row, Col, Button, Card } from 'antd';

import CartItemComponent from './CartItemComponent';
import { TotalPrice } from './CheckoutCartView';

export default class OrderCardComponent extends React.Component {
  getTotalRent() {
    console.log(this.props);
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
      <Card className="boxShadowTheme borderRadius9" align="left">
        <h3 className="OrderHead">Order Status</h3>
        {getCart &&
          getCart.orderDetails &&
          getCart.orderDetails.length !== 0 &&
          getCart.orderDetails.map((item, key) => <CartItemComponent inner={true} key={key} item={item} />)}

        <h3 className="OrderHead">Cart Summary</h3>
        {this.props.paid === true ? (
          <h5 className="lightText">
            Total rent amount{' '}
            <strong className="rightfloat">
              &#8377;
              {TotalPrice(getCart.orderDetails)}
            </strong>
          </h5>
        ) : (
          <h4 className="rentAmount">
            Total amount{' '}
            <strong className="colorFloat">
              &#8377;
              {TotalPrice(getCart && getCart.orderDetails.length !== 0 && getCart.orderDetails)}
            </strong>
          </h4>
        )}
        {getCart.paid === true ? (
          <h5 className="lightText">
            You paid <strong className="colorFloat">&#8377; {TotalPrice(getCart)}</strong>
            <h6 className="PaidMethodColor">{this.props.product.youPaid.method}</h6>
          </h5>
        ) : null}
        <br />
        <div align="right">
          {SubmitButton ? (
            <SubmitButton />
          ) : (
            <Button type="primary" onClick={this.props.onSubmit} size="large">
              {this.props.buttonText}
            </Button>
          )}
        </div>
      </Card>
    );
  }
}
