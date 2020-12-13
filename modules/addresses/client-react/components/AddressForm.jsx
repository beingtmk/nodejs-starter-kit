import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import { Row, Col, Button, RenderField, Form } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';

const AddressFormSchema = {
  streetAddress1: [required],
  streetAddress2: [required],
  city: [required],
  state: [required],
  pinCode: [required]
};

const AddressFormComponent = props => {
  const { handleSubmit, values, t } = props;

  // console.log('props form component', props.values.imageUrl);
  return (
    <Form onSubmit={handleSubmit} align="left">
      <Row type="flex" gutter={24}>
        <Col md={12} xs={24} align="left">
          <Field
            name="firstName"
            component={RenderField}
            placeholder={t('addressForm.firstName')}
            type="text"
            label={t('addressForm.firstName')}
            value={values.firstName}
          />
          <Field
            name="streetAddress1"
            component={RenderField}
            placeholder={t('addressForm.streetAddress')}
            type="text"
            label={t('addressForm.streetAddress')}
            value={values.streetAddress1}
          />
          <Field
            name="city"
            component={RenderField}
            placeholder={t('addressForm.city')}
            type="text"
            label={t('addressForm.city')}
            value={values.city}
          />
          <Field
            name="pinCode"
            component={RenderField}
            placeholder={t('addressForm.pinCode')}
            type="text"
            label={t('addressForm.pinCode')}
            value={values.pinCode}
          />
          <Field
            name="mobile"
            component={RenderField}
            placeholder={t('addressForm.mobile')}
            type="text"
            label={t('addressForm.mobile')}
            value={values.mobile}
          />
        </Col>
        <Col md={12} xs={24} align="left">
          <Field
            name="lastName"
            component={RenderField}
            placeholder={t('addressForm.lastName')}
            type="text"
            label={t('addressForm.lastName')}
            value={values.lastName}
          />
          <Field
            name="streetAddress2"
            component={RenderField}
            placeholder={t('addressForm.streetAddress')}
            type="text"
            label={t('addressForm.streetAddress')}
            value={values.streetAddress2}
          />
          <Field
            name="state"
            component={RenderField}
            placeholder={t('addressForm.state')}
            type="text"
            label={t('addressForm.state')}
            value={values.state}
          />
          <Field
            name="country"
            component={RenderField}
            placeholder={t('addressForm.country')}
            type="text"
            label={t('addressForm.country')}
            value={values.country}
          />
        </Col>
        <Col span={24} align="right">
          <Button color="primary" type="submit">
            {t('addressForm.btn.submit')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

AddressFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  t: PropTypes.func,
  showAdditional: PropTypes.bool
};

const AddressWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: (props.address && props.address.id) || null,
      streetAddress1: (props.address && props.address.streetAddress1) || '',
      streetAddress2: (props.address && props.address.streetAddress2) || '',
      city: (props.address && props.address.city) || '',
      state: (props.address && props.address.state) || '',
      country: (props.address && props.address.country) || '',
      pinCode: (props.address && props.address.pinCode) || '',

      firstName: (props.address && props.address.firstName) || '',
      lastName: (props.address && props.address.lastName) || '',
      mobile: (props.address && props.address.mobile) || ''
    };
  },
  async handleSubmit(values, { props: { onSubmit, hideModal } }) {
    await onSubmit(values);
    hideModal();
  },
  validate: values => validate(values, AddressFormSchema),
  displayName: 'Address Form' // helps with React DevTools
});

export default AddressWithFormik(AddressFormComponent);
