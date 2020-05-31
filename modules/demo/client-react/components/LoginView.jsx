import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Helmet from 'react-helmet';
import { Icon } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';
import LoginForm from './LoginForm';

const Login = styled.div`
  /* Headline */

  /* position: absolute; */
  width: 93px;
  height: 49px;
  /* left: 14px; */
  /* top: 106px; */

  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  /* Black */

  color: #222222;
`;

const LeftAction = styled.div`
  /* Left Action */
  /* position: absolute; */
  height: 44px;
  /* left: 0%; */
  /* right: 0%; */
  /* top: 44px; */
`;

const BackIcon = styled.div`
  /*icon */

  position: absolute;
  width: 24px;
  height: 24px;
  left: 8px;
  top: 8px;
`;

const renderMetaData = t => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const LoginView = props => {
  const { t } = props;
  return (
    <PageLayout>
      {renderMetaData(t)}
      <LeftAction>
        <BackIcon>
          <Icon type="left" />
        </BackIcon>
      </LeftAction>
      <Login>Login</Login>
      <LoginForm {...props} />
    </PageLayout>
  );
};

LoginView.propTypes = {
  t: PropTypes.func
};

export default LoginView;
