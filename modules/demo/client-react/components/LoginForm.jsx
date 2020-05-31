import React from 'react';
import { Icon } from 'antd';
import { withFormik } from 'formik';
import { NavLink, Link } from 'react-router-dom';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, minLength, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Alert, Button } from '@gqlapp/look-client-react';
import { GoogleButton, FacebookButton } from '@gqlapp/authentication-client-react';
import settings from '@gqlapp/config';
import { PropTypes } from 'prop-types';

const loginFormSchema = {
  usernameOrEmail: [required, minLength(3)],
  password: [required, minLength(settings.auth.password.minLength)]
};

const { facebook, google } = settings.auth.social;

const renderSocialButtons = (buttonsLength, t) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 200
      }}
    >
      {console.log('facebook', facebook)}
      {/* {facebook.enabled && ( */}
      <div className="text-center">
        <FacebookButton text={t('login.fbBtn')} type={'icon'} />
      </div>
      {/* )} */}
      {google.enabled && (
        <div className="text-center">
          <GoogleButton text={t('login.googleBtn')} type={'icon'} />
        </div>
      )}
    </div>
  );
};
const LoginForm = props => {
  const { handleSubmit, values, t, submitting, errors } = props;
  const buttonsLength = [facebook.enabled, google.enabled].filter(button => button).length;
  console.log('errros', errors);

  return (
    <Form name="login" onSubmit={handleSubmit}>
      <Field
        name="usernameOrEmail"
        component={RenderField}
        type="text"
        label="Email"
        // label={t('login.form.field.usernameOrEmail')}
        value={values.usernameOrEmail}
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label="Password"
        // label={t('login.form.field.pass')}
        value={values.password}
      />
      {/* <div className="text-center">{errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}</div> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className="text-center" style={{ marginTop: 10 }}>
          <Link to="/forgotpassword">
            {/* {t('login.btn.forgotPass')} */}
            Forget your password?
          </Link>
        </div>
        <Button block={true} size="lg" color="primary" type="submit" disabled={submitting}>
          <Icon type="login" /> {t('login.form.btnSubmit')}
        </Button>

        <p>Or login with social account</p>
        {renderSocialButtons(buttonsLength, t)}
      </div>
    </Form>
  );
};

LoginForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  t: PropTypes.func,
  submitting: PropTypes.bool
};

const LoginFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({ usernameOrEmail: '', password: '' }),

  handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, loginFormSchema),
  displayName: 'LoginForm' // helps with React DevTools
});

export default LoginFormWithFormik(LoginForm);
