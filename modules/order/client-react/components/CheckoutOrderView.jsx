import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import { Row, Col, Card, Divider } from 'antd';

import AddressView from '@gqlapp/addresses-client-react/components/AddressView';
import settings from '../../../../settings';

import CheckoutStepsComponent from './CheckoutStepsComponent';
import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
    script={[{ src: 'https://checkout.razorpay.com/v1/checkout.js' }]}
  />
);

export default class CheckoutOrderView extends React.Component {
  constructor(props) {
    super(props);
    // console.log('OrderView', props.loading);
    this.state = {
      product: {
        //   name: 'Canon EOS 70D DSLR Camera Bundle with Canon EF-S 18-55mm f/3.5- 5.6 IS ',
        //   // image: naruto2,
        //   date:
        //     !this.props.loading &&
        //     props.order &&
        //     props.order.orderDetails &&
        //     props.order.orderDetails.length !== 0 &&
        //     props.order.orderDetails[0].startDate,
        //   totalPrice:
        //     !this.props.loading &&
        //     props.order &&
        //     props.order.orderDetails &&
        //     props.order.orderDetails.length !== 0 &&
        //     props.order.orderDetails[0].totalRent,
        //   youPaid: {
        //     amount: 6300,
        //     method: 'Debit Card'
        //   }
        // },
        // status: {
        //   owner: 'Rajeev Khanna',
        //   date: {
        //     payment: "28 Nov'19",
        //     confirm: "29 Nov'18",
        //     pickup: "02 Dec'18",
        //     start: "03 Dec'18",
        //     check: "11 Dec'18"
        //   }
      },
      completed: 3
    };
  }

  // async onSubmit(values) {
  //   const { history, navigation } = this.props;

  //   // Get Values

  //   console.log('onSubmit Called!');
  //   // let userValues = pick(values, [
  //   //   'username',
  //   //   'email',
  //   //   'role',
  //   //   'isActive',
  //   //   'profile',
  //   //   'addresses',
  //   //   'portfolios',
  //   //   'password'
  //   // ]);

  //   // userValues = UserFormatter.trimExtraSpaces(userValues);

  //   // if (settings.auth.certificate.enabled) {
  //   //   userValues['auth'] = {
  //   //     certificate: pick(values.auth.certificate, 'serial')
  //   //   };
  //   // }

  //   // Call Mutation

  //   // try {
  //   //   await addUser(userValues);
  //   // } catch (e) {
  //   //   message.error(t('userAdd.errorMsg'));
  //   //   throw new FormError(t('userAdd.errorMsg'), e);
  //   // }

  //   // Add Message
  //   message.info('We will notify you of new updates!');

  //   // Redirect
  //   if (history) {
  //     return history.push('/my-orders/');
  //   }
  //   if (navigation) {
  //     return navigation.goBack();
  //   }
  // }

  render() {
    const { getCart } = this.props;
    const address =
      getCart &&
      getCart.orderDetails &&
      getCart.orderDetails.length > 0 &&
      getCart.orderDetails[0].orderDelivery &&
      getCart.orderDetails[0].orderDelivery.address;
    return (
      <PageLayout>
        {renderMetaData()}
        {/* {this.props.loading ? (
          <Loader />
        ) : ( */}
        <div className="checkoutDiv">
          <Row gutter={24}>
            <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
              <CheckoutStepsComponent step={3} />
            </Col>
            <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Row gutter={24}>
                <Col lg={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                  <Row>
                    {this.props.getCart && (
                      <>
                        <OrderTrackCardComponent
                          orderStatus={this.props.getCart.state}
                          // status={this.state.status}
                          completed={this.state.completed}
                        />
                        <Divider />
                        <Col lg={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                          {/* <div style={{ marginTop: "200px" }} /> */}
                          <Card className="boxShadowTheme borderRadius9">
                            <h4>The order will be delivered to the address below:</h4>
                            <hr />
                            <Row type="flex" justify="center" align="middle">
                              <AddressView addresses={[address]} addressId={address.id} />
                            </Row>
                          </Card>
                        </Col>
                      </>
                    )}
                  </Row>
                </Col>
                <Col lg={{ span: 14, offset: 0 }} xs={{ span: 24, offset: 0 }} className="marginT20">
                  {this.props.getCart && (
                    <CheckoutCardComponent
                      // onSubmit={this.props.openCheckout}
                      onSubmit={this.props.onSubmit}
                      getCart={this.props.getCart}
                      product={this.state.product}
                      showBtn={true}
                      paid={true}
                      buttonText={'Pay now'}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        {/* )} */}
      </PageLayout>
    );
  }
}
