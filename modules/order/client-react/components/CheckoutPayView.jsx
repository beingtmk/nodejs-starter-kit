import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
import { Layout, Menu, Row, Col, Card, Form, Input, Button } from 'antd';

import CheckoutStepsComponent from './CheckoutStepsComponent';
import EventCardComponent from './CheckoutCardComponent';

import settings from '../../../../settings';

const renderMetaData = () => (
  <>
    <Helmet
      title={`${settings.app.name} - Payment`}
      meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
      script={[{ src: 'https://checkout.razorpay.com/v1/checkout.js' }]}
    />
  </>
);
const ORDER = {
  id: 1,
  orderDetails: [
    {
      id: 1,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 1',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 4
    },
    {
      id: 2,
      thumbnail: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1582033916/ygz3yclqo2qmqewrqket.jpg',
      title: 'Listing 2',
      cost: 322,
      date: 'Wed May 20 2020',
      quantity: 3
    }
  ]
  // , delivery: {

  // }
};
export default class CheckoutPay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('on', this.props);
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="checkoutDiv" align="center">
          {/* {this.props.getCart && this.props.getCart.orderDetails && this.props.getCart.orderDetails.length !== 0 && ( */}
          {ORDER && ORDER.orderDetails && ORDER.orderDetails.length !== 0 && (
            <Row gutter={4} align="center">
              <CheckoutStepsComponent step={2} />
              <Col lg={{ span: 2 }} />
              <Col lg={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                <EventCardComponent
                  onSubmit={this.props.onSubmit}
                  getCart={ORDER}
                  buttonText={'Pay Now'}
                  SubmitButton={() => (
                    <Button type="primary" id="rzp-button" size="large" onClick={this.props.openCheckout}>
                      Pay Now
                    </Button>
                  )}
                />
              </Col>
            </Row>
          )}
        </div>
      </PageLayout>
    );
  }
}
