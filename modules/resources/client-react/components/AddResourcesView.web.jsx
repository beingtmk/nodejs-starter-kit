import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { withFormik, FieldArray } from 'formik';
import { PropTypes } from 'prop-types';
import Grid from 'hedron';
import { Form, Divider } from 'antd';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter, RenderField, Button, RenderUploadMultiple } from '@gqlapp/look-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { FieldAdapter as Field } from '@gqlapp/forms-client-react';

const AddResourcesSchema = {
  title: [required, minLength(5)],
  tags: [required],
  resource: [required]
};

const AddResourcesView = props => {
  const {
    t,
    values,
    handleSubmit
    // errors
    // , handleUploadFiles
  } = props;
  const [
    // load,
    setload
  ] = useState(false);

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
  );

  const renderContent = () => {
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

  return (
    <PageLayout>
      {console.log('props', props)}
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData()}
          <Grid.Box sm={{ hidden: 'true' }}>
            <LayoutCenter>{renderContent()}</LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
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
  async handleSubmit(values, props) {
    const { title, description, resource, tags, currentUser } = values;
    // console.log('values', values);
    // console.log('props from handleSubmit', props);
    const value = {};
    value.title = title;
    value.description = description;
    value.tags = tags;
    value.resource = resource;
    value.userId = currentUser.id;
    value.uploadedBy = currentUser.username;
    // console.log('value', value);
    props.props.addResource(value);
  },
  validate: values => validate(values, AddResourcesSchema),
  displayName: 'AddResourcesForm' // helps with React DevTools
});

export default AddResourcesWithFormik(AddResourcesView);
