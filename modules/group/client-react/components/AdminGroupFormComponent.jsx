import React from "react";
import PropTypes from "prop-types";
import { withFormik, FieldArray } from "formik";
import { FieldAdapter as Field } from "@gqlapp/forms-client-react";
import { required, validate } from "@gqlapp/validation-common-react";
import {
  Form,
  RenderField,
  Button,
  RenderUpload,
  Col,
  Row,
  Card,
  RenderDynamicField,
} from "@gqlapp/look-client-react";

import { MemberStatus, MemberType } from "@gqlapp/group-common";

const GroupFormComponentSchema = {
  title: [required],
  avatar: [required],
  description: [required],
  groupType: [required],
};

class GroupFormComponent extends React.Component {
  state = { load: false };

  setload = (load) => {
    this.setState({ load });
  };

  render() {
    const { values, handleSubmit, submitting, cardTitle } = this.props;

    return (
      <Row>
        <Col sm={24} md={{ span: 20, offset: 2 }} lg={{ span: 16, offset: 4 }}>
          <Card
            title={
              <h1>
                <strong>{cardTitle}</strong>
              </h1>
            }
          >
            <Form name="GroupFormComponent" onSubmit={handleSubmit}>
              <Field
                name="title"
                component={RenderField}
                type="text"
                label={"Title"}
                value={values.title}
              />

              <Field
                name="description"
                component={RenderField}
                type="textarea"
                label={"Description"}
                value={values.description}
              />

              <Field
                name="avatar"
                component={RenderUpload}
                type="text"
                setload={this.setload}
                label={"Group Avatar"}
                value={values.avatar}
              />

              <Field
                name="groupType"
                component={RenderField}
                type="text"
                label={"Group Type (eg. Orgainzation Name...)"}
                value={values.groupType}
              />

              <FieldArray
                name="members"
                render={(arrayHelpers) => (
                  <RenderDynamicField
                    buttonText="Add Member"
                    keys={[{ key: "email", type: "text" }]}
                    arrayHelpers={arrayHelpers}
                    values={values.members}
                    name="members"
                    label={"Members"}
                  />
                )}
              />

              <Button
                color="primary"
                type="submit"
                disabled={this.state.load || submitting}
              >
                {"Submit"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

GroupFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  currentUser: PropTypes.object,
  group: PropTypes.object,
  cardTitle: PropTypes.string,
  // t: PropTypes.func
};

const GroupFormComponentWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    title: props.group && props.group.title,
    description: props.group && props.group.description,
    groupType: props.group && props.group.groupType,
    avatar: props.group && props.group.avatar,
    members: (props.group && props.group.members) || [],
  }),
  validate: (values) => validate(values, GroupFormComponentSchema),
  handleSubmit(values, { props: { onSubmit, group, currentUser } }) {
    if (group) values["id"] = group.id;
    let members = [];
    let val = {};
    values.members.map((item) => {
      val = {
        email: item.email,
        type: item.type || MemberType.MEMBER,
        status: item.status || MemberStatus.ADDED,
      };
      if (item.id) val.id = item.id;
      members.push(val);
    });
    if (!members.some((item) => item.email === currentUser.email)) {
      members.push({
        email: currentUser.email,
        type: MemberType.MANAGER,
        status: MemberStatus.ADDED,
      });
    }
    values.members = members;
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: "GroupFormComponent", // helps with React DevTools
});

export default GroupFormComponentWithFormik(GroupFormComponent);
