import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { message, Modal } from 'antd';
import { Form, RenderField, Button, Alert } from '@gqlapp/look-client-react';

const CommentFormComponentSchema = {
  content: [required]
};

const CommentFormComponent = ({ values, handleSubmit, modalVisible, setModalVisible, errors, title }) => {
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      <Form name="comment" onSubmit={handleSubmit}>
        <Field
          name="content"
          component={RenderField}
          type="textarea"
          placeholder="Add comment..."
          value={values.content}
        />
        {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};
CommentFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  setModalVisible: PropTypes.func,
  values: PropTypes.object,
  errors: PropTypes.object,
  comment: PropTypes.object,
  title: PropTypes.string,
  modalVisible: PropTypes.bool,
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
      props: { onSubmit, setModalVisible }
    }
  ) {
    message.loading('Please wait...', 0);
    console.log(values);
    onSubmit(values);
    setModalVisible(false);
  },
  validate: values => validate(values, CommentFormComponentSchema),
  displayName: 'CommentForm ' // helps with React DevTools
});

export default translate('comment')(CommentFormWithFormik(CommentFormComponent));
