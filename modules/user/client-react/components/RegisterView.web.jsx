import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Card, CardGroup, Icon, CardTitle, CardText } from '@gqlapp/look-client-react';
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
    <Card className="form-card">
      <CardTitle>
        <Icon type="user-add" /> {t('reg.form.title')}
      </CardTitle>
      {isRegistered && settings.auth.password.requireEmailConfirmation ? (
        renderConfirmationModal()
      ) : (
        <RegisterForm onSubmit={onSubmit} />
      )}
    </Card>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData(t)}

      {renderContent()}
    </PageLayout>
  );
};

RegisterView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  isRegistered: PropTypes.bool
};

export default translate('user')(RegisterView);
