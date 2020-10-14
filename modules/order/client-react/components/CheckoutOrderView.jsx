import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { PageLayout } from '@gqlapp/look-client-react';
import { Row, Col, Card, Divider } from 'antd';

import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';
import AddressView from '@gqlapp/addresses-client-react/components/AddressView';

import settings from '../../../../settings';
import CheckoutStepsComponent from './CheckoutStepsComponent';
import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
    script={[{ src: 'https://checkout.razorpay.com/v1/checkout.js' }]}
  />
);

const CheckoutOrderView = props => {
  const { getCart, getCartLoading, onSubmit } = props;

  const address =
    getCart &&
    getCart.orderDetails &&
    getCart.orderDetails.length > 0 &&
    getCart.orderDetails[0].orderDelivery &&
    getCart.orderDetails[0].orderDelivery.address;

  return (
    <PageLayout>
      {renderMetaData()}
      {getCartLoading && <Spinner />}
      <div className="checkoutDiv">
        <Row gutter={24}>
          <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
            <CheckoutStepsComponent step={3} />
          </Col>
          <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
            <Row gutter={24}>
              <Col lg={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                <Row>
                  {getCart && (
                    <>
                      <OrderTrackCardComponent
                        orderStatus={getCart.orderState}
                        // status={state.status}
                        completed={3}
                      />
                      <Divider />
                      <Col
                        lg={{ span: 24, offset: 0 }}
                        sm={{ span: 24, offset: 0 }}
                        xs={{ span: 24, offset: 0 }}
                        style={{ paddingBottom: '5%' }}
                      >
                        {/* <div style={{ marginTop: "200px" }} /> */}
                        <Card className="boxShadowTheme borderRadius9">
                          <h4>The order will be delivered to the address below:</h4>
                          <hr />
                          <Row type="flex" justify="center" align="middle">
                            {address && <AddressView addresses={[address]} addressId={address.id} />}
                          </Row>
                        </Card>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col lg={{ span: 14, offset: 0 }} xs={{ span: 24, offset: 0 }} className="marginT20">
                {getCart && (
                  <CheckoutCardComponent
                    // onSubmit={openCheckout}
                    onSubmit={onSubmit}
                    getCart={getCart}
                    product={{}}
                    showState={false}
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
};

CheckoutOrderView.propTypes = {
  getCart: PropTypes.object,
  getCartLoading: PropTypes.bool,
  onSubmit: PropTypes.func
};

export default CheckoutOrderView;
