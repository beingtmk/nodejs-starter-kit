import React, { useState } from 'react';
import Grid from 'hedron';
import Helmet from 'react-helmet';
import { withFormik } from 'formik';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';

import ResourceFormComponent from './ResourceFormComponent.web';

const EditResourcesSchema = {
  title: [required, minLength(5)],
  tags: [required],
  resource: [required]
};

const EditResourcesView = props => {
  const {
    t,
    values,
    handleSubmit
    // errors
    // , handleUploadFiles
  } = props;
  const [load, setload] = useState(false);
  console.log('load', load);

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
    return <ResourceFormComponent handleSubmit={handleSubmit} values={values} setload={setload} />;
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

EditResourcesView.propTypes = {
  t: PropTypes.func,
  values: PropTypes.obj,
  handleSubmit: PropTypes.func,
  handleUploadFiles: PropTypes.func
};

const EditResourcesWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => ({
    title: (props && props.resource && props.resource.title) || '',
    description: (props && props.resource && props.resource.description) || '',
    tags: (props && props.resource && props.resource.tags) || '',
    resource: (props && props.resource && props.resource.resource) || ''
  }),
  async handleSubmit(values, props) {
    const { title, description, resource, tags } = values;
    const {
      editResource,
      resource: { userId, id, uploadedBy }
    } = props.props;
    console.log('values', values);
    console.log('props from handleSubmit', props);
    const value = {};
    value.id = id;
    value.title = title;
    value.description = description;
    value.tags = tags;
    value.resource = resource;
    value.userId = userId;
    value.uploadedBy = uploadedBy;
    console.log('value', value);
    editResource(value);
  },
  validate: values => validate(values, EditResourcesSchema),
  displayName: 'EditResourcesForm' // helps with React DevTools
});

export default EditResourcesWithFormik(EditResourcesView);
