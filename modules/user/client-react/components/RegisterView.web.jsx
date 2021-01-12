import React from 'react';
import PropTypes from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import {
  Icon,
  Row,
  Col,
  PageLayout,
  Card,
  CardGroup,
  CardTitle,
  CardText,
  Underline,
  MetaTags
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import RegisterForm from './RegisterForm';

const RegisterView = ({ t, onSubmit, isRegistered, location, history }) => {
  if (isRegistered && !settings.auth.password.requireEmailConfirmation && location.href.includes('?redirectBack=')) {
    const pushUrl = location.href.split('?redirectBack=')[1];
    history && history.push(pushUrl);
  }

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
      <Underline>
        <CardTitle>
          <Icon type="UserAddOutlined" /> {t('reg.form.title')}
        </CardTitle>
      </Underline>
      <br />
      {isRegistered && settings.auth.password.requireEmailConfirmation ? (
        renderConfirmationModal()
      ) : (
        <RegisterForm onSubmit={onSubmit} />
      )}
    </Card>
  );

  return (
    <PageLayout type="forms">
      <MetaTags title={t('reg.title')} description={t('reg.meta')} />
      <br />
      <Row>
        <Col lg={24} md={0} xs={0}>
          <br />
          <br />
          <br />
        </Col>
      </Row>
      {renderContent()}
    </PageLayout>
  );
};

RegisterView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func,
  isRegistered: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object
};

export default translate('user')(RegisterView);
