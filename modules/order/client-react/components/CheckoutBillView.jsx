import React from 'react';
import { Card, Row, Col } from 'antd';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { FieldArray, withFormik } from 'formik';
import { PageLayout } from '@gqlapp/look-client-react';
import RenderAddress from '@gqlapp/addresses-client-react/components/RenderAddresses';
// import { RenderAddress } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import EventCardComponent from './CheckoutCardComponent';
import CheckoutStepsComponent from './CheckoutStepsComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Bill`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

const CheckoutBillView = props => {
  // const addresses = getAddresses();
  const { t, values, onSelect, deleteAddress, btnDisabled } = props;
  const { addresses: address } = values;
  const addresses = [...address];
  const getCart = !props.loading && props.getCart;

  return (
    <PageLayout>
      {renderMetaData()}
      {console.log('props', props)}
      <div className="checkoutDiv">
        <Row type="flex" style={{ alignContent: 'center' }} gutter={24}>
          <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
            <CheckoutStepsComponent step={1} />
          </Col>
          <Col span={24}>
            <h3 className="billingAddress">Billing Address</h3>
            <br />
          </Col>

          <Col lg={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }}>
            {addresses && (
              <Card style={{ height: '100%' }}>
                <h3 className="billingAddress">Shipping Address</h3>
                <hr />
                <h4>Select the address you want the order to be delivered at:</h4>
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
          <Col lg={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }}>
            <EventCardComponent
              onSubmit={() => {
                console.log('Working!');
                props.onSubmit();
              }}
              getCart={getCart}
              btnDisabled={btnDisabled}
              showBtn={true}
              paid={false}
              buttonText={'Continue'}
            />
          </Col>
        </Row>
      </div>
      <div />
    </PageLayout>
  );
};

CheckoutBillView.propTypes = {
  product: PropTypes.object,
  currentUser: PropTypes.object,
  addOrEditAddresses: PropTypes.func,
  values: PropTypes.object,
  onSubmit: PropTypes.func,
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
  async handleSubmit(values, { props: { onSubmit } }) {
    // console.log('values', values);
    // onSubmit();
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});

export default CheckoutBillWithFormik(CheckoutBillView);
