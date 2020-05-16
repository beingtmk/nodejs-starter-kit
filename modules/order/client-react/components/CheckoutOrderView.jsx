import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import { Row, Col, message } from 'antd';

import settings from '../../../../settings';

import CheckoutStepsComponent from './CheckoutStepsComponent';
import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';
// import naruto2 from '../../resources/naruto2.jpg';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

export default class CheckoutOrderView extends React.Component {
  constructor(props) {
    super(props);
    console.log('OrderView', props.loading);
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
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const { history, navigation } = this.props;

    // Get Values

    console.log('onSubmit Called!');
    // let userValues = pick(values, [
    //   'username',
    //   'email',
    //   'role',
    //   'isActive',
    //   'profile',
    //   'addresses',
    //   'portfolios',
    //   'password'
    // ]);

    // userValues = UserFormatter.trimExtraSpaces(userValues);

    // if (settings.auth.certificate.enabled) {
    //   userValues['auth'] = {
    //     certificate: pick(values.auth.certificate, 'serial')
    //   };
    // }

    // Call Mutation

    // try {
    //   await addUser(userValues);
    // } catch (e) {
    //   message.error(t('userAdd.errorMsg'));
    //   throw new FormError(t('userAdd.errorMsg'), e);
    // }

    // Add Message
    message.info('We will notify you of new updates!');

    // Redirect
    if (history) {
      return history.push('/my-listings/');
    }
    if (navigation) {
      return navigation.goBack();
    }
  }

  render() {
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
                  <OrderTrackCardComponent
                    orderStatus={this.props.order.state}
                    // status={this.state.status}
                    completed={this.state.completed}
                  />
                </Col>
                <Col lg={{ span: 14, offset: 0 }} xs={{ span: 24, offset: 0 }} className="marginT20">
                  <CheckoutCardComponent
                    onSubmit={this.onSubmit}
                    getCart={this.props.order}
                    product={this.state.product}
                    paid={true}
                    buttonText={'View All Orders'}
                  />
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
