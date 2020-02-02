import React from 'react';
import Grid from 'hedron';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, Card, CardTitle, Icon } from '@gqlapp/look-client-react';
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
      <Card>
        <CardTitle>
          <Icon type="undo" /> {t('forgotPass.form.title')}
        </CardTitle>
        <h1 className="text-center"></h1>
        <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
      </Card>
    </>
  );

  return (
    <PageLayout type="forms">
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
