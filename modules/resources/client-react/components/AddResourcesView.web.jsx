import React, { useState } from 'react';
import Grid from 'hedron';
import Helmet from 'react-helmet';
import { withFormik } from 'formik';
import { PropTypes } from 'prop-types';
import { PageHeader } from 'antd';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';

import ResourceFormComponent from './ResourceFormComponent.web';

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
          <PageHeader
            // style={{
            //   border: '1px solid rgb(235, 237, 240)'
            // }}
            onBack={() => props.history.goBack()}
            title={`${t('title')}`}
            subTitle={t('resources.btn.add')}
          />
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
  handleUploadFiles: PropTypes.func,
  history: PropTypes.object
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
    console.log('value', value);
    props.props.addResource(value);
  },
  validate: values => validate(values, AddResourcesSchema),
  displayName: 'AddResourcesForm' // helps with React DevTools
});

export default AddResourcesWithFormik(AddResourcesView);
