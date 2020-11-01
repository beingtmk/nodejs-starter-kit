import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, phoneNumber, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button } from '@gqlapp/look-client-react';

const MobileFormSchema = {
  mobile: [required, phoneNumber]
};

const MobileForm = ({ otp, values, handleSubmit, submitting, t }) => {
  return (
    <Form name="Mobile" onSubmit={handleSubmit}>
      {!otp ? (
        <Field
          name="mobile"
          component={RenderField}
          type="text"
          label={t('mobileOTP.field.mobile')}
          value={values.mobile}
        />
      ) : (
        <Field name="otp" component={RenderField} type="number" label={t('mobileOTP.field.otp')} value={values.otp} />
      )}
      <Button color="primary" type="submit" disabled={submitting}>
        {t('mobileOTP.btn')}
      </Button>
    </Form>
  );
};

MobileForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  Mobile: PropTypes.object,
  otp: PropTypes.bool,
  t: PropTypes.func
};

const MobileFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    mobile: props.mobile && props.mobile.mobile,
    otp: props.Mobile && props.Mobile.otp
  }),
  validate: values => validate(values, MobileFormSchema),
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
    // console.log(values);
  },
  enableReinitialize: true,
  displayName: 'MobileForm' // helps with React DevTools
});

export default translate('user')(MobileFormWithFormik(MobileForm));
