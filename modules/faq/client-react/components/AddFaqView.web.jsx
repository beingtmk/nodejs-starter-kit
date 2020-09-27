import React from 'react';
import Grid from 'hedron';
import { Spin } from 'antd';
import Helmet from 'react-helmet';
import { PropTypes } from 'prop-types';

import settings from '@gqlapp/config';
import { PageLayout, LayoutCenter } from '@gqlapp/look-client-react';

import FaqFormComponent from './FaqFormComponent.web';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);
const AddFaqView = ({ t, loading, addFaq, currentUser }) => {
  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData(t)}
          {loading ? (
            <Spin />
          ) : (
            <>
              <Grid.Box sm={{ hidden: 'true' }}>
                <LayoutCenter>
                  <FaqFormComponent isAdminShow={true} cardTitle="Add Faq" t={t} onSubmit={addFaq} currentUser={currentUser} />
                </LayoutCenter>
              </Grid.Box>
              <Grid.Box md={{ hidden: 'true' }} lg={{ hidden: 'true' }}>
                <FaqFormComponent isAdminShow={true} cardTitle="Add Faq" t={t} onSubmit={addFaq} currentUser={currentUser} />
              </Grid.Box>
            </>
          )}
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

AddFaqView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  currentUser: PropTypes.object,
  addFaq: PropTypes.func
};

export default AddFaqView;
