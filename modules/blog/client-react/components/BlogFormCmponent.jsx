import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { translate } from '@gqlapp/i18n-client-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { Form, RenderField, Button, RenderContentField } from '@gqlapp/look-client-react';

// import { createEditorState } from "medium-draft";

const BlogFormSchema = {
  title: [required],
  content: [required]
};

class BlogForm extends React.Component {
  render() {
    const { values, handleSubmit, submitting } = this.props;

    const DataUpdate = data => (values.content = data);

    return (
      <Form name="BlogForm" onSubmit={handleSubmit}>
        <Field name="title" component={RenderField} type="text" label={'Title'} value={values.title} />
        <Field
          name="content"
          component={RenderContentField}
          type="text"
          label={'Content'}
          DataUpdate={DataUpdate}
          value={values.content}
        />
        <Button color="primary" type="submit" disabled={submitting}>
          {'Submit'}
        </Button>
      </Form>
    );
  }
}

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
