import React from 'react';

import PropTypes from 'prop-types';

import { LayoutCenter, PageLayout, Heading, MetaTags, Row, Col } from '@gqlapp/look-client-react';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordView = ({ t, onSubmit }) => {
  const renderContent = () => (
    <>
      <Heading type="1">{t('resetPass.form.title')}</Heading>
      <ResetPasswordForm onSubmit={onSubmit} />
    </>
  );

  return (
    <PageLayout>
      <MetaTags title={t('resetPass.title')} description={t('resetPass.meta')} />
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

ResetPasswordView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

export default ResetPasswordView;
