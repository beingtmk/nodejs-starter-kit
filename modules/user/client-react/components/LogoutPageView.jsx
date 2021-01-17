/* eslint-disable import/no-named-default */
import React from 'react';
import PropTypes from 'prop-types';

import { PageLayout, Icon, Row, Col, Button, Result } from '@gqlapp/look-client-react';
import { HOME_ROUTES } from '@gqlapp/home-client-react';
import { USER_ROUTES } from '@gqlapp/user-client-react';

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
          </Col>
          <Col xs={24} sm={24} md={0} lg={0}>
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
          title={
            <>
              <Row justify="center">
                <Col lg={24} md={24} sm={24} xs={0}>
                  Successfully Logged Out
                </Col>
                <Col lg={0} md={0} xs={24}>
                  Successfully
                </Col>
                <Col lg={0} md={0} xs={24}>
                  Logged Out
                </Col>
              </Row>
            </>
          }
          subTitle="It was a pleasure having you here. And see you again soon!"
          extra={
            <>
              <Row justify="center">
                <Col lg={{ span: 12 }}>
                  <Row type="flex" justify="center" gutter={[24, 24]}>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <Row justify="center">
                        <Button
                          color="primary"
                          block={true}
                          key="console"
                          onClick={() => history.push(`${HOME_ROUTES.home}`)}
                        >
                          <Icon type="HomeOutlined" /> Go To Home
                        </Button>
                      </Row>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <div style={{ width: '100%' }}>
                        <Button key="signIn" block={true} onClick={() => history.push(`${USER_ROUTES.login}`)}>
                          <Icon type="LoginOutlined" />
                          Sign In
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          }
        />
      </div>
    </PageLayout>
  );
};

LogoutPageView.propTypes = {
  history: PropTypes.object
};

export default LogoutPageView;
