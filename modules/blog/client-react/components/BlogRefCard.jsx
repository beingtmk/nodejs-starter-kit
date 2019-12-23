import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row } from '@gqlapp/look-client-react';

import { Card, Avatar, Button } from 'antd';

const BlogRefCard = ({ user, model }) => {
  return (
    <Card>
      <Row>
        <Col xs={3} sm={4} md={2} lg={3}>
          <Avatar size={54} src={model ? model.image : user.image} />
        </Col>
        <Col xs={21} sm={16} md={14} lg={18}>
          <h4 style={{ marginBottom: 0 }}>{user ? 'WRITTEN BY' : 'CATEGORY'}</h4>
          <h1>
            {(user && (
              <span>
                <strong>{`${user.firstname} ${user.lastname} `}</strong>
                <i>({user.username}) </i>
              </span>
            )) ||
              (model && <strong>{model.name}</strong>)}
          </h1>
          <Col xs={24} sm={0} md={0} lg={0}>
            <br />
          </Col>
          <h3>{model ? model.desc : user.desc}</h3>
        </Col>
        <br />
        <Col xs={24} md={2} lg={3}>
          <Button type="primary" ghost>
            Follow
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

BlogRefCard.propTypes = {
  model: PropTypes.object,
  user: PropTypes.object,
  //   setClap: PropTypes.func,
  t: PropTypes.func
};

export default translate('blog')(BlogRefCard);
