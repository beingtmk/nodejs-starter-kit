import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";

import { isFormError, FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { translate } from "@gqlapp/i18n-client-react";
import {
  match,
  email,
  minLength,
  required,
  validate,
} from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  Button,
  Alert,
  Icon,
} from "@gqlapp/look-client-react";
import settings from "@gqlapp/config";

const registerFormSchema = {
  username: [required, minLength(3)],
  email: [required, email],
  password: [required, minLength(settings.auth.password.minLength)],
  passwordConfirmation: [
    match("password"),
    required,
    minLength(settings.auth.password.minLength),
  ],
};

const RegisterForm = ({ values, isSubmitting, handleSubmit, submitting, errors, t }) => {
  return (
    <Form name="register" onSubmit={handleSubmit}>
      <Field
        name="username"
        component={RenderField}
        type="text"
        label={t("reg.form.field.name")}
        value={values.username}
      />
      <Field
        name="email"
        component={RenderField}
        type="text"
        label={t("reg.form.field.email")}
        value={values.email}
      />
      <Field
        name="password"
        component={RenderField}
        type="password"
        label={t("reg.form.field.pass")}
        value={values.password}
      />
      <Field
        name="passwordConfirmation"
        component={RenderField}
        type="password"
        label={t("reg.form.field.passConf")}
        value={values.passwordConfirmation}
      />
      <div className="text-center">
        {errors && errors.errorMsg && (
          <Alert color="error">{errors.errorMsg}</Alert>
        )}
        <div align="left" style={{ width: "100%" }}>
          <Button
            block={true}
            size="lg"
            color="primary"
            type="submit"
            size="large"
            loading={isSubmitting}
            disabled={submitting}
            style={{ padding: "0  60px" }}
          >
            <Icon type="user-add" /> {t("reg.form.btnSubmit")}
          </Button>
          <hr style={{ margin: "24px 0" }} />
          {/* {renderSocialButtons(buttonsLength, t)} */}
        </div>
      </div>
    </Form>
  );
};

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  errors: PropTypes.object,
  values: PropTypes.object,
  t: PropTypes.func,
};

const RegisterFormWithFormik = withFormik({
  mapPropsToValues: () => ({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  }),
  validate: (values) => validate(values, registerFormSchema),
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    onSubmit(values).catch((e) => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  enableReinitialize: true,
  displayName: "SignUpForm", // helps with React DevTools
});

export default translate("user")(RegisterFormWithFormik(RegisterForm));
