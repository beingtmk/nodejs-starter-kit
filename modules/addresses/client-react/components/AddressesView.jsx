import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Select, Option, Row, Col, MetaTags } from '@gqlapp/look-client-react';
import { withFormik } from 'formik';

import settings from '@gqlapp/config';

// import RenderAddress from './RenderAddresses';
import AddressItemComponent from './AddressItemComponent';

const AddressesView = ({ t, values, addOrEditAddresses, deleteAddress }) => {
  const [type, setType] = useState(false);
  // const [id, setId] = useState(0);
  const { addresses: address } = values;
  const addresses = [...address];

  // const onSelect = addressId => {
  //   console.log('address id', addressId);
  //   setId(addressId);
  // };

  return (
    <>
      <MetaTags title={t('title')} description={`${settings.app.name} - ${t('meta')}`} />

      <Select onChange={() => setType(!type)}>
        <Option value="dispaly">Display</Option>
        <Option value="selectable">Selectable</Option>
      </Select>
      <Row>
        <Col xl={16} lg={15} md={13} sm={24}>
          {addresses.map(a => (
            <AddressItemComponent address={a} t={t} onEdit={addOrEditAddresses} onDelete={() => deleteAddress(a.id)} />
          ))}

          {/* <FieldArray
            name="addresses"
            render={arrayHelpers => (
              <RenderAddress
                name="addresses"
                addresses={addresses}
                arrayHelpers={arrayHelpers}
                label="addresses"
                t={t}
                onSubmit={addOrEditAddresses}
                handleDeleteAddress={deleteAddress}
                isSelectable={type}
                onSelect={onSelect}
              />
            )}
          /> */}
        </Col>
        {type && (
          <Col xl={8} lg={9} md={11} sm={24}>
            {/* <Card style={{ margin: '30px' }}>
              <h1>Selected address : </h1>
              <h4>
                {addresses[id].streetAddress1}
                <br />
                {addresses[id].streetAddress2}
                <br />
                {addresses[id].city}
                <br />
                {addresses[id].pinCode}
              </h4>
            </Card> */}
          </Col>
        )}
      </Row>
    </>
  );
};

AddressesView.propTypes = {
  values: PropTypes.array,
  addOrEditAddresses: PropTypes.func,
  t: PropTypes.func,
  deleteAddress: PropTypes.func
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
