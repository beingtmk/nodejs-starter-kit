import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Button, Result } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';

const LOGOUT_PAGE_GIF =
  'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1601824605/cwy15kfennovwu6j4noe.webp';

const LogoutPageView = props => {
  const { history } = props;
  return (
    <PageLayout>
      <div align="center">
        <Row>
          <Col xs={0} sm={0} md={24} lg={24}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Col>
        </Row>
        <Result
          icon={
            <Row type="flex">
              <Col xs={0} sm={0} md={24} lg={24} align="center">
                <img src={LOGOUT_PAGE_GIF} height="200px" />
              </Col>
              <Col span={24} md={0} lg={0} align="center">
                <img src={LOGOUT_PAGE_GIF} height="100px" />
              </Col>
            </Row>
          }
          title="Successfully Logged Out"
          subTitle="Hey awesome manager, it was a pleasure having you here. And see you again soon! Go to HomeSignIn"
          extra={[
            <Button type="primary" key="console" onClick={() => history.push('/')}>
              <Icon type="home" /> Go To Home
            </Button>,
            <Button key="signIn" onClick={() => history.push('/login')}>
              <Icon type="login" />
              SignIn
            </Button>
          ]}
        />
      </div>
    </PageLayout>
  );
};

LogoutPageView.propTypes = {
  history: PropTypes.object
};

export default LogoutPageView;
