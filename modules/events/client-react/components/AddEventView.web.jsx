import React from 'react';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import EventFormComponent from './EventFormComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddEventView = ({ t, loading, addEvent, currentUser }) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <LayoutCenter>
        {loading ? <Spin /> : <EventFormComponent t={t} onSubmit={addEvent} currentUser={currentUser} />}
      </LayoutCenter>
    </PageLayout>
  );
};

AddEventView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addEvent: PropTypes.func
};

export default AddEventView;
