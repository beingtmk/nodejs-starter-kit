import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { PageLayout, Row, Col, Button, Icon, Card, Divider, Spinner, EditIcon } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import CheckoutLayout from './CheckoutLayout';
import OrderSummary from './OrderSummary';
import ListingCartItemComponent from './ListingCartItemComponent';
import ROUTES from '../routes';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Order`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
    script={[{ src: 'https://checkout.razorpay.com/v1/checkout.js' }]}
  />
);

const CheckoutOrderView = props => {
  const { currentUser, t, getCart, cartLoading, onSubmit, history } = props;

  const address =
    getCart &&
    getCart.orderDetails &&
    getCart.orderDetails.length > 0 &&
    getCart.orderDetails[0].orderDelivery &&
    getCart.orderDetails[0].orderDelivery.address;

  return (
    <PageLayout>
      {renderMetaData()}
      {cartLoading && <Spinner />}

      {!cartLoading && (
        <CheckoutLayout
          t={t}
          step={2}
          title={'Select Address'}
          loading={getCart && getCart.orderDetails.length > 0}
          Col1={
            <>
              <Card type="inner" title={<h3 style={{ marginBottom: '0px' }}>Ship to name</h3>}>
                <Row type={'flex'} align="middle">
                  <Col span={22}>
                    <h4>
                      <strong>Shipping Address</strong>
                    </h4>
                    {`${address.streetAddress1}, ${address.streetAddress2}`}
                    <br />
                    {`${address.city}, ${address.state}`}
                    <br />
                    {`${address.pinCode}`}
                    <br />
                    {/* {`Mobile: ${address.user.mobile}`} */}
                    {`Mobile: `}
                  </Col>
                  <Col span={2}>
                    <br />
                    <br />
                    <br />
                    <Link to={`${ROUTES.checkoutBill}`}>
                      <EditIcon color="default" size="md" />
                    </Link>
                  </Col>
                </Row>
              </Card>
              <br />
              {getCart &&
                getCart.orderDetails.map((cartItem, i) => (
                  <Row>
                    <Col span={24}>
                      <ListingCartItemComponent
                        modalId={cartItem.modalId}
                        t={t}
                        item={cartItem}
                        edit={true}
                        onSubmit={onSubmit}
                        // onDelete={onDelete}
                        currentUser={currentUser}
                        // onEdit={onEdit}
                      />
                      {getCart.orderDetails.length - 1 !== i ? <Divider /> : <br />}
                    </Col>
                  </Row>
                ))}
            </>
          }
          Col2={
            <OrderSummary
              t={t}
              getCart={getCart}
              history={history}
              btn={
                <Button onClick={onSubmit} size="lg" block color="primary">
                  <Icon type="CreditCardOutlined" />
                  PAY NOW
                </Button>
              }
            />
          }
        />
      )}
    </PageLayout>
  );
};

CheckoutOrderView.propTypes = {
  getCart: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  cartLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  t: PropTypes.func
};

export default CheckoutOrderView;
