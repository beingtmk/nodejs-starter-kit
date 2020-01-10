import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { message } from 'antd';
import { Form, RenderField, Button, Alert } from '@gqlapp/look-client-react';

const CommentFormComponentSchema = {
  content: [required]
};

const CommentFormComponent = ({ values, handleSubmit, errors }) => {
  return (
    <Form name="comment" onSubmit={handleSubmit}>
      <Field name="content" component={RenderField} type="text" label="Add comment..." value={values.content} />
      {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
      <Button color="primary" type="submit" size="sm">
        Submit
      </Button>
    </Form>
  );
};
CommentFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  comment: PropTypes.object,
  t: PropTypes.func
};
const CommentFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    content: props.comment && props.comment.content
  }),
  async handleSubmit(
    values,
    {
      props: { onSubmit }
    }
  ) {
    message.loading('Please wait...', 0);
    console.log(values);
    onSubmit(values);
  },
  validate: values => validate(values, CommentFormComponentSchema),
  displayName: 'CommentForm ' // helps with React DevTools
});

export default translate('liveSearch')(CommentFormWithFormik(CommentFormComponent));
