import React from 'react';
import PropTypes from 'prop-types';

import { NextButton, MetaTags, PageLayout, Row, Col, Spinner } from '@gqlapp/look-client-react';
import SelectAddress from '@gqlapp/addresses-client-react/containers/SelectAddress';
import AddAddressBtn from '@gqlapp/addresses-client-react/containers/AddAddressBtn';

import settings from '@gqlapp/config';
import CheckoutLayout from './CheckoutLayout';
import OrderSummary from './OrderSummary';

const CheckoutBillView = props => {
  const { t, onSelect, onSubmit, cartLoading, currentUser, btnDisabled, history } = props;
  const getCart = !props.loading && props.getCart;

  return (
    <PageLayout>
      <MetaTags title="Bill" description={`${settings.app.name} - ${'meta'}`} />
      {cartLoading && <Spinner />}

      {!cartLoading && (
        <CheckoutLayout
          t={t}
          step={1}
          title={'Select Address'}
          extra={<AddAddressBtn currentUser={currentUser} t={t} />}
          loading={getCart && getCart.orderDetails.length > 0}
          Col1={
            <Row>
              <Col span={1} />
              <Col span={23}>
                <SelectAddress onSelect={onSelect} currentUser={currentUser} />
              </Col>
            </Row>
          }
          Col2={
            <OrderSummary
              t={t}
              getCart={getCart}
              history={history}
              btn={
                <NextButton onClick={onSubmit} loading={cartLoading} disabled={btnDisabled} size="lg">
                  Continue
                </NextButton>
              }
            />
          }
        />
      )}
    </PageLayout>
  );
};

CheckoutBillView.propTypes = {
  currentUser: PropTypes.object,
  onSubmit: PropTypes.func,
  cartLoading: PropTypes.bool,
  btnDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSelect: PropTypes.func,
  getCart: PropTypes.object,
  history: PropTypes.object
};

export default CheckoutBillView;
