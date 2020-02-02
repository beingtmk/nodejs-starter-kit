import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordView = ({ t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('resetPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('resetPass.meta')}`
        }
      ]}
    />
  );

  const renderContent = () => (
    <>
      <h1>{t('resetPass.form.title')}</h1>
      <ResetPasswordForm onSubmit={onSubmit} />
    </>
  );

  return (
    <PageLayout>
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

ResetPasswordView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

export default ResetPasswordView;
