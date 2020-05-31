import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

const Name = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height, or 122% */

  padding-top: 15px;

  /* Black */

  color: #222222;
`;

const Email = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* Gray */

  color: #9b9b9b;
`;

const ProfileComponenet = props => {
  const { user } = props;
  console.log('user', user);
  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <Row justify="space-around" type="flex">
        <Col span={6} align="center" style={{ width: '100px', overflow: 'hidden' }}>
          <img alt="" src={user.thumbnail} height="100px" width="100px" style={{ borderRadius: '50%' }} />
        </Col>
        <Col span={15}>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileComponenet;
