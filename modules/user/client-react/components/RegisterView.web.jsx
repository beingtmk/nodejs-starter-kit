import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'hedron';

import { translate } from '@gqlapp/i18n-client-react';
import { LayoutCenter, PageLayout, Card, CardGroup, CardTitle, CardText } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import RegisterForm from './RegisterForm';

const RegisterView = ({ t, onSubmit, isRegistered }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('reg.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('reg.meta')}`
        }
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: 'center' }}>
        <CardTitle>{t('reg.confirmationMsgTitle')}</CardTitle>
        <CardText>{t('reg.confirmationMsgBody')}</CardText>
      </CardGroup>
    </Card>
  );

  const renderContent = () => (
    <>
      <h1 className="text-center">{t('reg.form.title')}</h1>
      {isRegistered && settings.auth.password.requireEmailConfirmation ? (
        renderConfirmationModal()
      ) : (
        <RegisterForm onSubmit={onSubmit} />
      )}
    </>
  );

  return (
    <PageLayout>
      <Grid.Provider breakpoints={{ sm: '-500', md: '501-768', lg: '+769' }}>
        <Grid.Bounds direction="vertical">
          {renderMetaData(t)}
          <Grid.Box sm={{ hidden: true }}>
            <LayoutCenter>{renderContent()} </LayoutCenter>
          </Grid.Box>
          <Grid.Box md={{ hidden: true }} lg={{ hidden: true }}>
            {renderContent()}
          </Grid.Box>
        </Grid.Bounds>
      </Grid.Provider>
    </PageLayout>
  );
};

RegisterView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  isRegistered: PropTypes.bool
};

export default translate('user')(RegisterView);
