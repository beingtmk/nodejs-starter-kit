import React from 'react';
import PropTypes from 'prop-types';
import { PageLayout, Card, CardTitle, Icon, Heading, MetaTags, Row, Col } from '@gqlapp/look-client-react';
// import { UndoOutlined } from '@ant-design/icons';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordView = ({ onSubmit, t, sent }) => {
  const renderContent = () => (
    <>
      <Card>
        <CardTitle>
          <Heading type="2">
            <Icon type="UndoOutlined" />
            {t('forgotPass.form.title')}
          </Heading>
        </CardTitle>
        <h1 className="text-center"></h1>
        <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
      </Card>
    </>
  );

  return (
    <PageLayout type="forms">
      <MetaTags title={t('forgotPass.title')} description={t('forgotPass.meta')} />
      <Row justify="center">
        <Col xs={24} lg={12}>
          <Col xs={24} md={24} lg={0}>
            <br />
            <br />
            <br />
            <br />
          </Col>
          <Col xs={0} md={0} lg={24}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
          {renderContent()}
        </Col>
      </Row>
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
