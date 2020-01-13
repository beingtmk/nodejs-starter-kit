import React from 'react';
import { Form, Divider } from 'antd';
import { FieldArray } from 'formik';
import { RenderField, Button, RenderUploadMultiple } from '@gqlapp/look-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { PropTypes } from 'prop-types';

const ResourceFormComponent = ({ handleSubmit, values, setload }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field
          name="title"
          component={RenderField}
          placeholder="Title"
          type="text"
          label="Title"
          value={values.title}
        />

        <Field
          name="description"
          component={RenderField}
          placeholder="Description"
          type="textarea"
          label="Description"
          value={values.description}
        />

        <Field name="tags" component={RenderField} placeholder="Tags" type="text" label="Tags" value={values.tags} />

        <FieldArray
          name="resource"
          label="Upload Resources"
          render={arrayHelpers => (
            <RenderUploadMultiple
              setload={setload}
              arrayHelpers={arrayHelpers}
              values={values.resource}
              dictKey="resourceUrl"
            />
          )}
        />

        <Button
          type="submit"
          color="primary"
          // disabled={!errors}
        >
          Submit
        </Button>
      </Form>
      <Divider />
    </div>
  );
};

export default ResourceFormComponent;

ResourceFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  values: PropTypes.object,
  setload: PropTypes.func
};
