import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Divider, Alert, Button } from 'antd';

import MiniBlogImageComponent from '@gqlapp/blog-client-react/components/MiniBlogImageComponent';

import moment from 'moment';
import { Name, emptyCover } from '../constants';

const { Meta } = Card;

const GroupComponent = ({ group }) => {
  console.log(group);
  let invites = [],
    joinees = [];

  group.members.map(item => {
    if (item.member) joinees.push(item);
    else invites.push(item);
  });

  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      >
        <Card className="blog-detailview-card" bodyStyle={{ padding: '10px' }}>
          <Row gutter={32}>
            <Col xs={24} sm={23} md={12} lg={12}>
              <MiniBlogImageComponent title={group.title} image={group.avatar} />
              <br />
            </Col>
            <Col xs={24} sm={23} md={12} lg={12}>
              <>
                <h1
                  style={{
                    padding: '0 20px'
                  }}
                >
                  {group.title}
                </h1>
                <h2
                  style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0 20px'
                  }}
                >
                  {group.description}
                </h2>
                <Meta
                  style={{ padding: '0 20px' }}
                  description={`Created on ${moment(group.createdAt).format('MMM DD, YYYY')}`}
                />
                <br />
                <Link to={`/group/edit/${group.id}`}>
                  <Button icon="edit" type="primary" size="small" ghost style={{ padding: '0 20px' }}>
                    Edit
                  </Button>
                </Link>
              </>
            </Col>
            <Divider />
            <h1
              style={{
                padding: '0 20px'
              }}
            >
              Members
            </h1>
            <Divider />
            {joinees.map(item => (
              <Col xs={24} sm={12} md={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      style={{ height: '200px' }}
                      alt={item.email}
                      src={(item.member.profile && item.member.profile.avatar) || emptyCover}
                    />
                  }
                >
                  <Meta
                    title={
                      <span
                        style={{
                          fontSize: '15px'
                        }}
                      >
                        {Name(item.member.profile)}
                        <i>({item.member.username}) </i>
                      </span>
                    }
                    description={`Added on ${moment(item.createdAt).format('MMM DD, YYYY')}`}
                  />
                  <br />
                  <Alert type="success" message={item.type} />
                </Card>
              </Col>
            ))}
            <br />
            <Divider />
            {invites.map(item => (
              <Col xs={24} sm={12} md={12} lg={8}>
                <Card hoverable title={item.email}>
                  <Alert type="warning" message="Invited" />
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

GroupComponent.propTypes = {
  group: PropTypes.object,
  t: PropTypes.func
};

export default translate('group')(GroupComponent);
