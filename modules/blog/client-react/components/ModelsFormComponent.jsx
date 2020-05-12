import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import { required, validate } from '@gqlapp/validation-common-react';
import { message, Modal } from 'antd';
import { Form, RenderField, RenderUpload, Button, Alert } from '@gqlapp/look-client-react';

const ModelsFormComponentSchema = {
  image: [required],
  name: [required],
  desc: [required]
};

const ModelsFormComponent = ({ values, handleSubmit, errors, title, model }) => {
  const [load, setload] = useState(false);
  const [visible, setModalVisible] = useState(false);
  return (
    <>
      {model ? (
        <Button shape="circle" icon="edit" color="primary" size="sm" onClick={() => setModalVisible(true)} />
      ) : (
        <Button color="primary" onClick={() => setModalVisible(true)}>
          {title}
        </Button>
      )}
      <Modal title={title} visible={visible} onCancel={() => setModalVisible()} footer={null}>
        <Form name="model" onSubmit={handleSubmit}>
          <Field name="name" component={RenderField} type="text" label="Name of th model" value={values.name} />
          <Field
            name="image"
            component={RenderUpload}
            type="text"
            setload={setload}
            label="Upload an image"
            value={values.image}
          />
          <Field name="desc" component={RenderField} type="text" label="A suitable description" value={values.desc} />
          {errors && errors.errorMsg && <Alert color="error">{errors.errorMsg}</Alert>}
          <div className="width100">
            <Button color="primary" disabled={load} className="rightfloat" type="submit" size="sm">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

ModelsFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  model: PropTypes.object,
  title: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  t: PropTypes.func
};

const ModelsFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: ({ model }) => ({
    image: model && model.image,
    name: model && model.name,
    desc: model && model.desc
  }),
  async handleSubmit(values, { setErrors, props: { onSubmit, model } }) {
    message.loading('Please wait...', 0);
    if (model) values['id'] = model.id;
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, ModelsFormComponentSchema),
  displayName: 'ModelsForm ' // helps with React DevTools
});

export default translate('blog')(ModelsFormWithFormik(ModelsFormComponent));
