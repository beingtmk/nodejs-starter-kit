import React from 'react';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import RenderAddress from './RenderAddresses';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const AddressesView = ({ t, values }) => {
  const { addresses: address } = values;
  const addresses = [...address];
  return (
    <PageLayout>
      {renderMetaData(t)}
      <FieldArray
        name="addresses"
        render={arrayHelpers => (
          <RenderAddress
            name="addresses"
            addresses={addresses}
            arrayHelpers={arrayHelpers}
            label="addresses"
            t={t}
            // onSubmit={() => this.handleSave(values)}
            // isSelectable={true}
            // onSelect={onSelect}
          />
        )}
      />
    </PageLayout>
  );
};

AddressesView.propTypes = {
  values: PropTypes.array,
  t: PropTypes.func
};

const AddressesViewWithFormik = withFormik({
  mapPropsToValues: values => {
    const { addresses } = values;

    function getAddresses(address) {
      return {
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
  async handleSubmit(
    values // , { props: { onSubmit } }
  ) {
    console.log('values', values);
    // onSubmit();
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});
export default AddressesViewWithFormik(AddressesView);
