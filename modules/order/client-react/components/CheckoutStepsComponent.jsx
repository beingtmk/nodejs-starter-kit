import React, { Component } from 'react';
import styled from 'styled-components';
import { Steps, Col } from 'antd';

const CheckoutSteps = styled.div`
  text-align: center;
  text-shadow: 1px 0 0;
  font-size: 30px;
  margin-bottom: 19px;
`;

const Step = Steps.Step;

class CheckoutStepsComponent extends Component {
  render() {
    return (
      <Col lg={24} md={24} align="left">
        <CheckoutSteps>Checkout</CheckoutSteps>
        <Steps current={this.props.step} size="small">
          <Step title={<span className="font13">Cart</span>} />
          <Step title={<span className="font13">Billing Address</span>} />
          <Step title={<span className="font13">Payment options</span>} />
        </Steps>
        <br />
        <br />
      </Col>
    );
  }
}

export default CheckoutStepsComponent;
