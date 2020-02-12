import React from 'react';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';
import { FieldArray, withFormik } from 'formik';

import settings from '@gqlapp/config';

import RenderAddress from './RenderAddresses';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const AddressesView = ({ t, values, addOrEditAddresses }) => {
  const { addresses: address } = values;
  const addresses = [...address];
  return (
    <>
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
            onSubmit={addOrEditAddresses}
            // userId={currentUser.id}
            // isSelectable={true}
            // onSelect={onSelect}
          />
        )}
      />
    </>
  );
};

AddressesView.propTypes = {
  values: PropTypes.array,
  addOrEditAddresses: PropTypes.func,
  t: PropTypes.func
};

const AddressesViewWithFormik = withFormik({
  mapPropsToValues: values => {
    const { addresses } = values;

    function getAddresses(address) {
      return {
        id: address.id ? address.id : null,
        userId: address.userId,
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
    values // , { props: { addOrEditAddresses } }
  ) {
    console.log('values', values);
    // try {
    //   await addOrEditAddresses(values);
    // } catch (e) {
    //   console.log(e);
    // }
  },
  displayName: 'CheckoutBill ' // helps with React DevTools
});
export default AddressesViewWithFormik(AddressesView);
