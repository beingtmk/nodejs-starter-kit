import React from 'react';
import styled from 'styled-components';
import { Row, Col, Icon } from 'antd';

const Head = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

  /* Black */

  color: #222222;
`;

const Detail = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;

  /* Gray */

  color: #9b9b9b;
`;

const ProfileMenuItem = props => {
  const {
    data: { title, details }
  } = props;

  return (
    <div style={{ height: '72px' }}>
      <Row justify="space-around" align="middle" type="flex">
        <Col span={20}>
          <Row>
            <Col span={24}>
              <Head>{title}</Head>
            </Col>
            <Col span={24}>
              <Detail>{details}</Detail>
            </Col>
          </Row>
        </Col>
        <Col span={3}>
          <Icon type="right" />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileMenuItem;
