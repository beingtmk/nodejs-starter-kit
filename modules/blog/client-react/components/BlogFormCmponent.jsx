import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button, RenderUpload, RenderContentField } from '@gqlapp/look-client-react';

const BlogFormSchema = {
  title: [required],
  image: [required],
  content: [required]
};
const BlogForm = ({ values, handleSubmit, submitting }) => {
  const DataUpdate = data => (values.content = data);
  const [load, setload] = useState(false);
  return (
    <Form name="BlogForm" onSubmit={handleSubmit}>
      <Field name="title" component={RenderField} type="text" label={'Title'} value={values.title} />
      <Field
        name="image"
        component={RenderUpload}
        type="text"
        setload={setload}
        label={'Cover Image'}
        value={values.image}
      />
      <Field
        name="content"
        component={RenderContentField}
        type="text"
        label={'Content'}
        DataUpdate={DataUpdate}
        value={values.content}
      />
      <Button color="primary" type="submit" disabled={load || submitting}>
        {'Submit'}
      </Button>
    </Form>
  );
};

BlogForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  blog: PropTypes.object
  // t: PropTypes.func
};

const BlogFormWithFormik = withFormik({
  mapPropsToValues: props => ({
    title: props.blog && props.blog.title,
    image: props.blog && props.blog.image,
    content: props.blog && props.blog.content
  }),
  validate: values => validate(values, BlogFormSchema),
  handleSubmit(
    values
    // {
    //   props: { onSubmit }
    // }
  ) {
    // onSubmit(values);
    console.log(values);
  },
  enableReinitialize: true,
  displayName: 'BlogForm' // helps with React DevTools
});

export default translate('blog')(BlogFormWithFormik(BlogForm));
