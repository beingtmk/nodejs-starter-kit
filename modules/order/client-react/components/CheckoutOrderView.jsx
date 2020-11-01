import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { PageLayout, Row, Col } from '@gqlapp/look-client-react';
import { Card, Divider } from 'antd';

import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';
import AddressView from '@gqlapp/addresses-client-react/components/AddressView';

import settings from '@gqlapp/config';
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
  const { t, getCart, getCartLoading, onSubmit } = props;

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
      {!getCartLoading && (
        <Row gutter={24}>
          <Col span={24} align="center">
            <CheckoutStepsComponent step={0} t={t} />
            <br />
            <br />
          </Col>
          <Col lg={22} md={22} xs={24}>
            <Row gutter={24}>
              <Col lg={10} md={10} xs={24}>
                {getCart && (
                  <Row gutter={24}>
                    <Col span={24}>
                      <OrderTrackCardComponent
                        t={t}
                        orderStatus={getCart.orderState}
                        // status={state.status}
                        completed={3}
                      />
                      <Divider />
                    </Col>
                    <Col span={24}>
                      <Card className="boxShadowTheme borderRadius9">
                        <h4>{t('checkoutOrder.orderAddress')}</h4>
                        <hr />
                        <Row type="flex" justify="center" align="middle">
                          {address && <AddressView addresses={[address]} addressId={address.id} />}
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Col>
              <Col lg={14} md={14} xs={24}>
                {getCart && (
                  <CheckoutCardComponent
                    // onSubmit={openCheckout}
                    t={t}
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
      )}
    </PageLayout>
  );
};

CheckoutOrderView.propTypes = {
  getCart: PropTypes.object,
  getCartLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default CheckoutOrderView;
