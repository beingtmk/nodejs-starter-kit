import React from 'react';
import PropTypes from 'prop-types';
import { PageLayout, MetaTags, Row, Col, Card, Divider, Spinner } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import AddressItemComponent from '@gqlapp/addresses-client-react/components//AddressItemComponent';

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
      {!loading && order && (
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
          <Col lg={22} md={22} xs={24}>
            <Row gutter={24}>
              <Col lg={10} md={10} xs={24}>
                <Row>
                  {order && (
                    <Row gutter={24}>
                      <Col span={24}>
                        <OrderTrackCardComponent
                          t={t}
                          orderPayment={order.orderPayment}
                          orderStatus={order.state}
                          // status={state.status}
                          completed={3}
                        />
                        <Divider />
                      </Col>
                      <Col span={24}>
                        <Card>
                          <h4>{t('orderDetails.addressText')}</h4>
                          <hr />
                          {address && <AddressItemComponent active={address.id} address={address} t={t} />}
                        </Card>
                      </Col>
                    </Row>
                  )}
                </Row>
              </Col>
              <Col lg={14} md={14} xs={24}>
                {!loading && order && (
                  <CheckoutCardComponent
                    t={t}
                    onSubmit={onSubmit}
                    order={order}
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
