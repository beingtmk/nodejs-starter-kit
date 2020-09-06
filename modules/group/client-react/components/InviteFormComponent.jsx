import React from "react";
import PropTypes from "prop-types";
import { Select, Typography } from "antd";
import { withFormik, FieldArray } from "formik";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { required, validate, email } from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  Button,
  RenderSelect,
} from "@gqlapp/look-client-react";
import { MemberStatus, MemberType } from "@gqlapp/group-common";

const { Text } = Typography;

const InviteFormSchema = {
  userEmail: [required, email],
};

class InviteForm extends React.Component {
  state = { load: false };

  setload = (load) => {
    this.setState({ load });
  };

  render() {
    const { values, handleSubmit, submitting, error } = this.props;

    return (
      <Form name="InviteForm" onSubmit={handleSubmit}>
        <Field
          name="userEmail"
          component={RenderField}
          type="text"
          label={"Email"}
          value={values.userEmail}
        />

        <Field
          name="type"
          component={RenderSelect}
          type="select"
          label={"User Type"}
          value={values.type}
        >
          <Select.Option key={MemberType.ADMIN} value={MemberType.ADMIN}>
            {MemberType.ADMIN}
          </Select.Option>
          <Select.Option key={MemberType.MEMBER} value={MemberType.MEMBER}>
            {MemberType.MEMBER}
          </Select.Option>
        </Field>
        {error && <Text type="warning">{error}</Text>}
        <Button
          color="primary"
          type="submit"
          block
          disabled={this.state.load || submitting}
        >
          {"Submit"}
        </Button>
      </Form>
    );
  }
}

InviteForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  currentUser: PropTypes.object,
  // t: PropTypes.func
};

const InviteFormWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    userEmail: null,
    type: null,
  }),
  validate: (values) => validate(values, InviteFormSchema),
  handleSubmit(values, { props: { onSubmit } }) {
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: "InviteForm", // helps with React DevTools
});

export default InviteFormWithFormik(InviteForm);
