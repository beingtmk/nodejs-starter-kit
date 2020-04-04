import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Grid from 'hedron';

import { translate } from '@gqlapp/i18n-client-react';
import {
  LayoutCenter,
  PageLayout,
  Card,
  CardGroup,
  Icon,
  CardTitle,
  CardText,
  Underline
} from '@gqlapp/look-client-react';
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
    <Card>
      <CardTitle>
        <Icon type="user-add" /> {t('reg.form.title')}
      </CardTitle>
      <Underline length="80px" />
      {isRegistered && settings.auth.password.requireEmailConfirmation ? (
        renderConfirmationModal()
      ) : (
        <RegisterForm onSubmit={onSubmit} />
      )}
    </Card>
  );

  return (
    <PageLayout type="forms">
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
