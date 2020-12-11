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
        </Col>
        <Col md={12} xs={24} align="left">
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
      pinCode: (props.address && props.address.pinCode) || ''
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
