import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, New } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordView = ({ onSubmit, t, sent }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('forgotPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('forgotPass.meta')}`
        }
      ]}
    />
  );

  const renderContent = () => (
    <>
      <h1 className="text-center">{t('forgotPass.form.title')}</h1>
      <New length="140px" />
      <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
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

ForgotPasswordView.propTypes = {
  onSubmit: PropTypes.func,
  forgotPassword: PropTypes.func,
  sent: PropTypes.bool,
  t: PropTypes.func
};

export default ForgotPasswordView;
