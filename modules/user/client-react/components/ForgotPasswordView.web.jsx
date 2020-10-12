import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { LayoutCenter, PageLayout, Card, CardTitle, Icon, Heading, MetaTags } from '@gqlapp/look-client-react';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordView = ({ onSubmit, t, sent }) => {
  const renderContent = () => (
    <>
      <Card>
        <CardTitle>
          <Heading type="2">
            <Icon type="undo" /> {t('forgotPass.form.title')}
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
      <Row>
        <Col md={0} lg={0}>
          {renderContent()}
        </Col>
        <Col xs={0} md={24} lg={24}>
          <LayoutCenter>{renderContent()}</LayoutCenter>
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
