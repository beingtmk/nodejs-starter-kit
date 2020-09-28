import React from 'react';
import PropTypes from 'prop-types';
import { PageLayout } from '@gqlapp/look-client-react';
import { Row, Col, Divider, Card } from 'antd';

import AddressView from '@gqlapp/addresses-client-react/components/AddressView';

import CheckoutCardComponent from './CheckoutCardComponent';
import OrderTrackCardComponent from './OrderTrackCardComponent';

const OrderDetailsView = props => {
  const { order, onSubmit } = props;
  const address =
    order &&
    order.orderDetails &&
    order.orderDetails.length > 0 &&
    order.orderDetails[0].orderDelivery &&
    order.orderDetails[0].orderDelivery.address;

  return (
    <PageLayout>
      <div className="checkoutDiv">
        <Row gutter={24}>
          <Col span={24}>
            <Row type="flex" justify="center">
              {order && <h2>Order id - {order.id}</h2>}
            </Row>
          </Col>
          {/* <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
            <CheckoutStepsComponent step={3} />
          </Col> */}
          <Col lg={{ span: 22, offset: 1 }} md={{ span: 22, offset: 1 }} xs={{ span: 24, offset: 0 }}>
            <Row gutter={24}>
              <Col lg={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }} className="margin20">
                <Row>
                  {order && (
                    <>
                      <OrderTrackCardComponent
                        orderPayment={order.orderPayment}
                        orderStatus={order.state}
                        // status={state.status}
                        completed={3}
                      />
                      <Divider />
                      <Col lg={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
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
                {order && (
                  <CheckoutCardComponent
                    onSubmit={onSubmit}
                    getCart={order}
                    product={3}
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
    </PageLayout>
  );
};

OrderDetailsView.propTypes = {
  order: PropTypes.object,
  onSubmit: PropTypes.func
};

export default OrderDetailsView;
