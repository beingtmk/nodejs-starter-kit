import React from 'react';
import Helmet from 'react-helmet';
import { withFormik } from 'formik';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';
import {
  Form,
  //  Upload,
  // Icon,
  // message,
  Divider
} from 'antd';

import settings from '@gqlapp/config';
import { PageLayout, RenderField, Button } from '@gqlapp/look-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

const AddResourcesSchema = {
  title: [required, minLength(5)]
};

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

// const { Dragger } = Upload;

// const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };

const AddResourcesView = ({ t, values, handleSubmit, handleUploadFiles }) => {
  return (
    <PageLayout>
      {/* {console.log('props', props)} */}
      {renderMetaData(t)}
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

          <Button type="submit">Submit</Button>
        </Form>
        <Divider />
        {/* <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
          </p>
        </Dragger> */}
        <Dropzone onDrop={handleUploadFiles}>
          <p style={{ padding: '10px' }}>{t('message')}</p>
        </Dropzone>
      </div>
    </PageLayout>
  );
};

AddResourcesView.propTypes = {
  t: PropTypes.func,
  values: PropTypes.obj,
  handleSubmit: PropTypes.func,
  handleUploadFiles: PropTypes.func
};

const AddResourcesWithFormik = withFormik({
  enableReinitialize: true,
  // mapPropsToValues: () => ({
  //   title: ''
  // }),
  async handleSubmit(values, props, info) {
    console.log('values', values);
    console.log('info', info);
    console.log('props from handleSubmit', props);
  },
  validate: values => validate(values, AddResourcesSchema),
  displayName: 'AddResourcesForm' // helps with React DevTools
});

export default AddResourcesWithFormik(AddResourcesView);
