import React from 'react';
import { Row, Col } from 'antd';

import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, Heading } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPasswordView = ({ t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('resetPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('resetPass.meta')}`
        }
      ]}
    />
  );

  const renderContent = () => (
    <>
      <Heading type="1">{t('resetPass.form.title')}</Heading>
      <ResetPasswordForm onSubmit={onSubmit} />
    </>
  );

  return (
    <PageLayout>
      {renderMetaData()}
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
