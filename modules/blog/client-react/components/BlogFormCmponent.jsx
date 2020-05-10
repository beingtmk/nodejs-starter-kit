import React, { useState } from "react";
import PropTypes from "prop-types";
import { withFormik, FieldArray } from "formik";
import { translate } from "@gqlapp/i18n-client-react";
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
  RenderContentField,
  RenderSelect,
  RenderDynamicField,
} from "@gqlapp/look-client-react";
import { Select } from "antd";

import { statusForm } from "../constants";

const BlogFormSchema = {
  title: [required],
  status: [required],
  content: [required],
  modelId: [required],
};
class BlogForm extends React.Component {
  state = { load: false };

  setload = (load) => {
    this.setState({ load });
  };

  render() {
    const DataUpdate = (data) => (values.content = data);
    const {
      blog,
      values,
      handleSubmit,
      submitting,
      cardTitle,
      models,
    } = this.props;

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
            <Form name="BlogForm" onSubmit={handleSubmit}>
              <Field
                name="modelId"
                component={RenderSelect}
                label="Select the model"
                value={values.modelId}
              >
                {models.map((item, idx) => (
                  <Select.Option key={idx} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Field>
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
                name="image"
                component={RenderUpload}
                type="text"
                setload={this.setload}
                label={"Cover Image"}
                value={values.image}
              />

              <Field
                name="content"
                component={RenderContentField}
                type="text"
                label={"Content"}
                DataUpdate={DataUpdate}
                value={values.content}
              />

              <FieldArray
              name="tags"
              render={(arrayHelpers) => (
                <RenderDynamicField
                  buttonText="Add Tag"
                  keys={[{ key: "text", type: "text" }]}
                  arrayHelpers={arrayHelpers}
                  values={values.tags}
                  name="tags"
                  label={"Tags"}
                />
              )}
            />

              <Field
                name="status"
                component={RenderSelect}
                label="Status"
                value={values.status}
              >
                {statusForm.map((item, idx) => (
                  <Select.Option key={idx} value={item.key}>
                    {item.text}
                  </Select.Option>
                ))}
              </Field>
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

BlogForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  models: PropTypes.array,
  blog: PropTypes.object,
  cardTitle: PropTypes.string,
  // t: PropTypes.func
};

const BlogFormWithFormik = withFormik({
  mapPropsToValues: (props) => ({
    title: props.blog && props.blog.title,
    description: props.blog && props.blog.description,
    status: props.blog && props.blog.status,
    image: props.blog && props.blog.image,
    content: props.blog && props.blog.content,
    tags: (props.blog && props.blog.tags) || [],
    modelId: props.blog && props.blog.model ? props.blog.model.id : null,
  }),
  validate: (values) => validate(values, BlogFormSchema),
  handleSubmit(values, { props: { onSubmit, blog } }) {
    if (blog) values["id"] = blog.id;
    onSubmit(values);
  },
  enableReinitialize: true,
  displayName: "BlogForm", // helps with React DevTools
});

export default translate("blog")(BlogFormWithFormik(BlogForm));
