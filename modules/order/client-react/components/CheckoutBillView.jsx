import React from 'react';
import { Row, Col } from 'antd';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { FieldArray, withFormik } from 'formik';
import { PageLayout } from '@gqlapp/look-client-react';
// import RenderAddress from '@gqlapp/addresses-client-react/components/RenderAddresses';

import settings from '../../../../settings';
import EventCardComponent from './CheckoutCardComponent';
import CheckoutStepsComponent from './CheckoutStepsComponent';

const renderMetaData = () => (
  <Helmet
    title={`${settings.app.name} - Bill`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${'meta'}` }]}
  />
);

class CheckoutBillView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        days: 4,
        date: {
          start: "04 Jan'19",
          end: "07 Jan'19"
        },
        refund: 5000,
        totalRent: 1300
      },
      mobile: !this.props.loading && this.props.currentUser && this.props.currentUser.mobile,
      userAddresses:
        !this.props.loading &&
        this.props.currentUser &&
        this.props.currentUser.profile &&
        this.props.currentUser.profile.addresses &&
        this.props.currentUser.profile.addresses.length !== 0
          ? this.props.currentUser.profile.addresses
          : null
    };
  }

  render() {
    // const addresses = this.getAddresses();
    const { t, values, onSelect, order } = this.props;
    const { addresses: address } = values;
    const addresses = [...address];
    const getCart = !this.props.loading && this.props.getCart;

    return (
      <PageLayout>
        {renderMetaData()}
        {console.log('props', this.props)}
        <div className="checkoutDiv">
          <Row style={{ alignContent: 'center' }}>
            <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }} align="center">
              <CheckoutStepsComponent step={1} />
            </Col>
            <Col span={24}>
              <h3 className="billingAddress">Billing Address</h3>
              <br />
            </Col>
            {/* <Col lg={{ span: 12, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <FieldArray
                name="addresses"
                render={arrayHelpers => (
                  <RenderAddress
                    name="addresses"
                    addresses={addresses}
                    arrayHelpers={arrayHelpers}
                    label="addresses"
                    t={t}
                    onSubmit={this.props.addOrEditAddresses}
                    isSelectable={true}
                    onSelect={onSelect}
                  />
                )}
              />
            </Col> */}
            <Col lg={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <EventCardComponent
                onSubmit={() => {
                  console.log('Working!');
                  this.props.onSubmit();
                }}
                getCart={order}
                paid={false}
                buttonText={'Continue'}
              />
            </Col>
          </Row>
        </div>
        <div />
      </PageLayout>
    );
  }
}

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
  mapPropsToValues: values => {
    const addresses =
      values && values.currentUser && values.currentUser.profile && values.currentUser.profile.addresses;

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
    console.log('values', values);
    // onSubmit();
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});

export default CheckoutBillWithFormik(CheckoutBillView);
