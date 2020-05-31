import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Helmet from 'react-helmet';
import { Icon } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import ForgotPasswordForm from './ForgotPasswordForm';

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const ForgotPasswordView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <h1>Forgot password</h1>
      <ForgotPasswordForm />
    </PageLayout>
  );
};

ForgotPasswordView.propTypes = {
  t: PropTypes.func
};

export default ForgotPasswordView;
