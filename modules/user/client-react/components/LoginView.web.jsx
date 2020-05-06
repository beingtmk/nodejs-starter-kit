import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, Card, CardGroup, CardTitle, CardText, Button, Underline, Icon } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import LoginForm from './LoginForm';

const LoginView = ({ onSubmit, t, isRegistered, hideModal }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('login.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('login.meta')}`
        }
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: 'center' }}>
        <CardTitle>{t('reg.successRegTitle')}</CardTitle>
        <CardText>{t('reg.successRegBody')}</CardText>
        <CardText>
          <Button style={{ minWidth: '320px' }} color="primary" onClick={hideModal}>
            {t('login.form.btnSubmit')}
          </Button>
        </CardText>
      </CardGroup>
    </Card>
  );

  const renderContent = () => (
    <>
      {isRegistered ? (
        renderConfirmationModal()
      ) : (
        <Card className="form-card">
          <Underline>
            <CardTitle>
              <Icon type="login" /> {t('login.form.title')}
            </CardTitle>
          </Underline>
          <LoginForm onSubmit={onSubmit} />
          <hr />
          <Card>
            <CardGroup>
              <CardTitle>{t('login.cardTitle')}:</CardTitle>
              <CardText>admin@example.com:admin123</CardText>
              <CardText>user@example.com:user1234</CardText>
            </CardGroup>
          </Card>
        </Card>
      )}
    </>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData()}

      {renderContent()}
    </PageLayout>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
  isRegistered: PropTypes.bool,
  hideModal: PropTypes.func
};

export default LoginView;
