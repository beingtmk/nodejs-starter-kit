import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import { MetaTags, PageLayout, Row, Col, Card } from '@gqlapp/look-client-react';
import RenderAddress from '@gqlapp/addresses-client-react/components/RenderAddresses';
import Spinner from '@gqlapp/look-client-react/ui-antd/components/Spinner';

import settings from '@gqlapp/config';
import CheckoutCardComponent from './CheckoutCardComponent';
import CheckoutStepsComponent from './CheckoutStepsComponent';

const CheckoutBillView = props => {
  // const addresses = getAddresses();
  const { t, values, onSelect, deleteAddress, cartLoading, btnDisabled } = props;
  const { addresses: address } = values;
  const addresses = [...address];
  const getCart = !props.loading && props.getCart;
  return (
    <PageLayout>
      <MetaTags title="Bill" description={`${settings.app.name} - ${'meta'}`} />
      {cartLoading && <Spinner />}
      {getCart && (
        <div className="checkoutDiv">
          <Row type="flex" style={{ alignContent: 'center' }} gutter={24}>
            <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
              <CheckoutStepsComponent step={1} t={t} />
            </Col>
            <Col span={24}>
              <h3 className="billingAddress">{t('checkoutBill.billingAddress')}</h3>
              <br />
            </Col>

            <Col lg={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }} style={{ paddingBottom: '5%' }}>
              {addresses && (
                <Card style={{ height: '100%' }}>
                  <h3 className="billingAddress">{t('checkoutBill.shippingAddress')}</h3>
                  <br />
                  <hr />
                  <br />
                  <h4>{t('checkoutBill.selectAddress')}</h4>
                  <FieldArray
                    name="addresses"
                    render={arrayHelpers => (
                      <RenderAddress
                        name="addresses"
                        addresses={addresses}
                        handleDeleteAddress={deleteAddress}
                        arrayHelpers={arrayHelpers}
                        label="addresses"
                        t={t}
                        onSubmit={props.addOrEditAddresses}
                        isSelectable={true}
                        onSelect={onSelect}
                      />
                    )}
                  />
                </Card>
              )}
            </Col>
            <Col lg={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }} style={{ paddingBottom: '5%' }}>
              <CheckoutCardComponent
                t={t}
                onSubmit={() => {
                  // console.log('Working!');
                  props.onSubmit();
                }}
                showState={false}
                getCart={getCart}
                btnDisabled={btnDisabled}
                showBtn={true}
                paid={false}
                buttonText={'Continue'}
              />
            </Col>
          </Row>
        </div>
      )}
    </PageLayout>
  );
};

CheckoutBillView.propTypes = {
  currentUser: PropTypes.object,
  addOrEditAddresses: PropTypes.func,
  values: PropTypes.object,
  onSubmit: PropTypes.func,
  cartLoading: PropTypes.bool,
  deleteAddress: PropTypes.func,
  btnDisabled: PropTypes.bool,
  loading: PropTypes.bool,
  t: PropTypes.func,
  onSelect: PropTypes.func,
  getCart: PropTypes.object
};

const CheckoutBillWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const addresses = props && props.addresses;

    function getAddresses(address) {
      return {
        id: address.id || null,
        streetAddress1: address.streetAddress1,
        streetAddress2: address.streetAddress2,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode
      };
    }

    return {
      addresses: addresses && addresses.length !== 0 ? addresses.map(getAddresses) : []
    };
  },
  async handleSubmit() {
    // onSubmit();
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});

export default CheckoutBillWithFormik(CheckoutBillView);
