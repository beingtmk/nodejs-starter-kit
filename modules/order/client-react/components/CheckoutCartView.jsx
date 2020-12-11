import React from 'react';
import PropTypes from 'prop-types';

import {
  NextButton,
  CheckBox,
  PageLayout,
  MetaTags,
  Row,
  Col,
  Card,
  Divider,
  Spinner
} from '@gqlapp/look-client-react';

import OrderSummary from './OrderSummary';
import CheckoutLayout from './CheckoutLayout';
import CartItemComponent from './CartItemComponent';
import ROUTES from '../routes';

const CheckoutCartView = props => {
  const [checkout, setCheckout] = React.useState(false);
  const { t, history, cartLoading, onSubmit, getCart, onDelete, currentUser, onEdit } = props;

  return (
    <PageLayout>
      <MetaTags title="Cart" description="meta" />

      {cartLoading && <Spinner />}
      <CheckoutLayout
        t={t}
        title={'Shopping Cart'}
        loading={!cartLoading && getCart && getCart.orderDetails.length > 0}
        Col1={
          <>
            <Card
              type="inner"
              title={
                <Row type="flex">
                  <Col span={12}>
                    <h3 style={{ marginBottom: '0px' }}>Product Details</h3>
                  </Col>
                  <Col span={12} style={{ display: 'flex' }}>
                    <Col span={7} align="center">
                      <h3 style={{ marginBottom: '0px' }}>Quantity</h3>
                    </Col>
                    <Col span={1} align="center" />
                    <Col span={8} align="center">
                      <h3 style={{ marginBottom: '0px' }}>Price</h3>
                    </Col>
                    <Col span={8} align="center">
                      <h3 style={{ marginBottom: '0px' }}>Total</h3>
                    </Col>
                  </Col>
                </Row>
              }
              bodyStyle={{
                padding: '0px'
              }}
            >
              <br />
              {getCart &&
                getCart.orderDetails.map((cartItem, i) => (
                  <Row>
                    <Col span={24}>
                      <CartItemComponent
                        modalId={cartItem.modalId}
                        t={t}
                        item={cartItem}
                        edit={true}
                        onSubmit={onSubmit}
                        onDelete={onDelete}
                        currentUser={currentUser}
                        onEdit={onEdit}
                      />
                      {getCart.orderDetails.length - 1 !== i ? <Divider /> : <br />}
                    </Col>
                  </Row>
                ))}
            </Card>
          </>
        }
        Col2={
          <OrderSummary
            t={t}
            getCart={getCart}
            history={history}
            btn={
              <>
                <CheckBox onChange={e => setCheckout(e.target.checked)}>{t('checkoutCart.checkbox')}</CheckBox>
                <br />
                <br />
                <NextButton onClick={() => history.push(`${ROUTES.checkoutBill}`)} block disabled={!checkout}>
                  {t('checkoutCart.btn.checkout')}
                </NextButton>
              </>
            }
          />
        }
      />
    </PageLayout>
  );
};

CheckoutCartView.propTypes = {
  history: PropTypes.object,
  getCart: PropTypes.object,
  currentUser: PropTypes.object,
  cartLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  t: PropTypes.func
};

export default CheckoutCartView;
