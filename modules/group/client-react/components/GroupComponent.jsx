import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Link } from 'react-router-dom';
import { Col, Row, Card, Divider, Alert, Button, Empty } from 'antd';

import MiniBlogImageComponent from '@gqlapp/blog-client-react/components/MiniBlogImageComponent';

import moment from 'moment';
import { Name, emptyCover } from '../constants';

const { Meta } = Card;

const GroupComponent = ({ group }) => {
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
                    fontSize: '20px',
                    color: 'rgba(0, 0, 0, 0.44)',
                    padding: '0 20px'
                  }}
                >
                  {group.description}
                </h2>
                <br />
                <h3
                  style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0 20px'
                  }}
                >
                  {`Group Type: ${group.groupType}`}
                </h3>
                <br />
                <Meta
                  style={{ padding: '10px 20px' }}
                  description={<>{`Created on ${moment(group.createdAt).format('MMM DD, YYYY')}`}</>}
                />
                <Link to={`/group/edit/${group.id}`}>
                  <Button icon="edit" type="primary" size="small" ghost style={{ margin: '10px 20px' }}>
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
            {joinees.length > 0 ? (
              joinees.map(item => (
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
                          <strong>{item.member.email}</strong>
                          <br />
                          <span>{Name(item.member.profile)}</span>
                          <br />
                          <span>
                            Username: <i>{item.member.username} </i>
                          </span>
                        </span>
                      }
                      description={`Added on ${moment(item.createdAt).format('MMM DD, YYYY')}`}
                    />
                    <br />
                    <Alert type="success" message={item.type} />
                  </Card>
                </Col>
              ))
            ) : (
              <Empty />
            )}
            <br />
            <Divider />
            <h1
              style={{
                padding: '0 20px'
              }}
            >
              Invites
            </h1>
            <Divider />
            {invites.length > 0 ? (
              invites.map(item => (
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Card hoverable title={item.email}>
                    <Alert type="warning" message="Invited" />
                  </Card>
                </Col>
              ))
            ) : (
              <Empty />
            )}
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
