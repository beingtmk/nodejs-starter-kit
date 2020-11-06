import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Row, Col, Avatar, Divider } from '@gqlapp/look-client-react';
// import { CardGroup } from '@gqlapp/look-client-react';
import { ImgUser } from '../../constants/DefaultImages';

const ProfileHeadComponent = ({ profile, description }) => {
  return (
    <div align="center" style={{ marginBottom: '10px' }}>
      <Avatar size={100} src={profile && profile.avatar ? profile.avatar : ImgUser} />
      <br />

      <h2 style={{ textAlign: 'center' }}>
        <Icon type="RobotOutlined" />
        {profile && profile.firstName && profile.lastName ? profile.firstName + ' ' + profile.lastName : 'Not Provided'}
      </h2>

      <h4 style={{ textAlign: 'center' }}>({profile && profile.designation ? profile.designation : 'Not Provided'})</h4>
      <Divider />
      <Row>
        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <h2>{profile && profile.acceptanceRate ? profile.acceptanceRate : 'Not Available'}</h2>

          <h4>{description.acceptanceRate}</h4>
        </Col>

        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <div>
            <h2>
              <span className="StarRate">
                {profile && profile.rating ? profile.rating : 'Not Rated'}
                <Icon type="StarFilled" />
              </span>
            </h2>

            <h4>{description.rating}</h4>
          </div>
        </Col>

        <Col
          span={8}
          style={{
            align: 'center'
          }}
        >
          <h2>{profile && profile.rating ? profile.rating : 'Not Available '}</h2>
          <h4>{description.responseTime}</h4>
        </Col>
      </Row>
    </div>
  );
};

ProfileHeadComponent.propTypes = {
  profile: PropTypes.object,
  description: PropTypes.object
};

export default ProfileHeadComponent;
