import React from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Icon,
  Col,
  PageLayout,
  Card,
  CardGroup,
  CardTitle,
  CardText,
  Button,
  Underline,
  MetaTags
} from '@gqlapp/look-client-react';

import LoginForm from './LoginForm';

const LoginView = ({ onSubmit, t, isRegistered, hideModal, history }) => {
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
              <Icon type="LoginOutlined" /> &nbsp;
              {t('login.form.title')}
            </CardTitle>
          </Underline>
          <LoginForm onSubmit={onSubmit} history={history} />
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
      <MetaTags title={t('login.title')} description={t('login.meta')} />
      <Row>
        <Col lg={24} md={0} xs={0}>
          <br />
          <br />
        </Col>
      </Row>
      {renderContent()}
    </PageLayout>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func,
  isRegistered: PropTypes.bool,
  history: PropTypes.object,
  hideModal: PropTypes.func
};

export default LoginView;
