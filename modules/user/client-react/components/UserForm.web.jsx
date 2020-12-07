import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isEmpty } from 'lodash';

import { IMG_ASPECT } from '@gqlapp/listing-common';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { email, minLength, required, match, validate } from '@gqlapp/validation-common-react';
import {
  Form,
  RenderField,
  RenderSelect,
  RenderCheckBox,
  Option,
  Alert,
  SubmitButton,
  // RenderUpload,
  RenderUploadWithCrop,
  Row,
  Col,
  ModalDrawer
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

const userFormSchema = {
  username: [required, minLength(3)],
  email: [required, email]
};

const createUserFormSchema = {
  ...userFormSchema,
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [required, match('password'), minLength(settings.auth.password.minLength)]
};

const updateUserFormSchema = {
  ...userFormSchema,
  password: minLength(settings.auth.password.minLength),
  passwordConfirmation: [match('password'), minLength(settings.auth.password.minLength)]
};

const UserForm = props => {
  const { values, handleSubmit, errors, setFieldValue, t, shouldDisplayRole, shouldDisplayActive } = props;
  const [load, setLoad] = useState(false);
  const { username, email, role, isActive, profile, auth } = values;

  console.log('props', values);
  return (
    <Form name="user" onSubmit={handleSubmit}>
      <Row type="flex" gutter={24}>
        <Col lg={14} xs={24}>
          <Field
            name="username"
            component={RenderField}
            type="text"
            label={t('userEdit.form.field.name')}
            value={username}
          />
          <Field
            name="email"
            component={RenderField}
            type="email"
            label={t('userEdit.form.field.email')}
            value={email}
          />
        </Col>
        <Col lg={10} xs={24} align="center">
          &nbsp; &nbsp;
          <Col lg={3} xs={24} />
          <Col lg={18} xs={24}>
            <Field
              name="profile.avatar"
              value={values.profile.avatar}
              setload={e => setLoad(e)}
              load={load}
              shape="round"
              height={IMG_ASPECT.medium.height}
              width={IMG_ASPECT.medium.width}
              // component={RenderUpload}
              component={RenderUploadWithCrop}
              label={'Avatar'}
              cropPropSettings={{
                shape: 'round'
              }}
            />
          </Col>
        </Col>
      </Row>

      {shouldDisplayRole && (
        <Field
          name="role"
          component={RenderSelect}
          type="select"
          label={t('userEdit.form.field.role.label')}
          value={role}
        >
          <Option value="user">{t('userEdit.form.field.role.user')}</Option>
          <Option value="admin">{t('userEdit.form.field.role.admin')}</Option>
        </Field>
      )}
      {shouldDisplayActive && (
        <Field
          name="isActive"
          component={RenderCheckBox}
          type="checkbox"
          label={t('userEdit.form.field.active')}
          checked={isActive}
        />
      )}
      <Field
        name="firstName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.firstName')}
        value={profile.firstName}
        onChange={value => setFieldValue('profile', { ...profile, firstName: value })}
      />
      <Field
        name="lastName"
        component={RenderField}
        type="text"
        label={t('userEdit.form.field.lastName')}
        value={profile.lastName}
        onChange={value => setFieldValue('profile', { ...profile, lastName: value })}
      />
      {settings.auth.certificate.enabled && (
        <Field
          name="serial"
          component={RenderField}
          type="text"
          label={t('userEdit.form.field.serial')}
          value={auth && auth.certificate && auth.certificate.serial}
          onChange={value => setFieldValue('auth', { ...auth, certificate: { ...auth.certificate, serial: value } })}
        />
      )}
      {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
      <Row type="flex" gutter={24}>
        <Col lg={12} md={12} xs={24}>
          <ModalDrawer buttonText="Reset password" modalTitle="Reset Password" height="auto" ghost={true}>
            <ResetPasswordForm {...props} load={load} />
          </ModalDrawer>
        </Col>
        <Col lg={12} md={12} xs={24}>
          <SubmitButton color="primary" type="submit" disabled={load}>
            {t('userEdit.form.btnSubmit')}
          </SubmitButton>
        </Col>
      </Row>
    </Form>
  );
};

const ResetPasswordForm = props => {
  const { t, values, handleSubmit, load, hideModal } = props;
  const { password, passwordConfirmation } = values;
  const handleOnSubmit = () => {
    handleSubmit(values);
    hideModal();
  };
  return (
    <>
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.pass')}
        value={password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t('userEdit.form.field.passConf')}
        value={passwordConfirmation}
      />
      <SubmitButton type="submit" disabled={load} onClick={handleOnSubmit}>
        {t('userEdit.form.btnSubmit')}
      </SubmitButton>
    </>
  );
};
ResetPasswordForm.propTypes = {
  t: PropTypes.func,
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  load: PropTypes.bool,
  hideModal: PropTypes.func
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  onSubmit: PropTypes.func,
  setTouched: PropTypes.func,
  isValid: PropTypes.bool,
  shouldDisplayRole: PropTypes.bool,
  shouldDisplayActive: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  initialValues: PropTypes.object.isRequired,
  touched: PropTypes.object,
  t: PropTypes.func
};

const UserFormWithFormik = withFormik({
  mapPropsToValues: values => {
    const { username, email, role, isActive, profile } = values.initialValues;
    return {
      username: username,
      email: email,
      role: role || 'user',
      isActive: isActive,
      password: '',
      passwordConfirmation: '',
      profile: {
        firstName: profile && profile.firstName,
        lastName: profile && profile.lastName,
        avatar: profile && profile.avatar
      },
      auth: {
        ...values.initialValues.auth
      }
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    if (values.password === '' || values.passwordConfirmation === '') {
      delete values.passwordConfirmation;
      delete values.password;
    }
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  displayName: 'SignUpForm ', // helps with React DevTools
  validate: (values, props) =>
    validate(values, isEmpty(props.initialValues) ? createUserFormSchema : updateUserFormSchema)
});

export default translate('user')(UserFormWithFormik(UserForm));
