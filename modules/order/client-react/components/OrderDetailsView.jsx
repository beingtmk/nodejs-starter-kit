import React from 'react';
import PropTypes from 'prop-types';
import { PageLayout, MetaTags } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Card } from 'antd';
import settings from '@gqlapp/config';

import AddressView from '@gqlapp/addresses-client-react/components/AddressView';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';

const OrderDetailsView = props => {
  const { order, onSubmit, loading, t } = props;
  const address =
    order &&
    order.orderDetails &&
    order.orderDetails.length > 0 &&
    order.orderDetails[0].orderDelivery &&
    order.orderDetails[0].orderDelivery.address;

  return (
    <PageLayout>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${'meta'}`} />

      {loading && <Spinner />}
      {order && (
        <div className="checkoutDiv">
          <Row gutter={24}>
            <Col span={24} align="left">
              {order && (
                <h2>
                  {t('orderDetails.id')}
                  {order.id}
                </h2>
              )}
              <br />
              <hr />
              <br />
            </Col>
            <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
              <Row gutter={24}>
                <Col lg={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                  <Row>
                    {order && (
                      <>
                        <OrderTrackCardComponent
                          t={t}
                          orderPayment={order.orderPayment}
                          orderStatus={order.state}
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
                          <Card className="boxShadowTheme borderRadius9">
                            <h4>{t('orderDetails.addressText')}</h4>
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
                  {order && (
                    <CheckoutCardComponent
                      t={t}
                      onSubmit={onSubmit}
                      getCart={order}
                      product={3}
                      showState={true}
                      showBtn={false}
                      paid={true}
                      buttonText={'View All Orders'}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </PageLayout>
  );
};

OrderDetailsView.propTypes = {
  loading: PropTypes.bool,
  order: PropTypes.object,
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default OrderDetailsView;
