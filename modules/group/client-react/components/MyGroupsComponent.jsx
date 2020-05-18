import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row, Card, Button, Tooltip, Empty } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import MiniBlogImageComponent from '@gqlapp/blog-client-react/components/MiniBlogImageComponent';

const MyGroupsComponent = ({ groups }) => {
  return (
    <Row gutter={32} className="groups-list-row">
      <div style={{ marginBottom: '30px', marginLeft: '16px' }}>
        <h1 style={{ fontSize: '32px' }}>My Groups</h1>

        <div align="left">
          <div key="line" className="title-line-wrapper" style={{ width: '200px' }} align="left">
            <div className="title-line" />
          </div>
        </div>
      </div>
      {groups ? (
        groups.map(item => (
          <Col xs={24} md={12} sm={12} lg={8}>
            <Card
              hoverable
              cover={<MiniBlogImageComponent title={item.title} image={item.avatar} />}
              className="blog-catalogue-card"
              style={{ marginBottom: '20px' }}
            >
              <div style={{ height: '220px', width: '100%' }}>
                <Tooltip placement="bottomLeft" title={item.title}>
                  <h1>
                    <p>{`${item.title.substring(0, 20)}${item.description.length > 20 ? '...' : ''}`}</p>
                  </h1>
                </Tooltip>
                <Tooltip placement="bottomLeft" title={item.description}>
                  <h2
                    style={{
                      fontSize: '15px',
                      color: 'rgba(0, 0, 0, 0.44)'
                    }}
                  >
                    {`${item.description.substring(0, 40)}${item.description.length > 40 ? '...' : ''}`}
                  </h2>
                </Tooltip>
                <br />
                <h3
                  style={{
                    color: 'rgba(0, 0, 0, 0.74)'
                  }}
                >
                  {`Group Type: ${item.groupType}`}
                </h3>
                <br />
                <h3>{`Created on ${moment(item.createdAt).format('MMM DD, YYYY')}`}</h3>
                <br />
                <Row gutter={16}>
                  <Col span={12}>
                    <Link to={`/group/${item.id}`}>
                      <Button icon="eye" block type="primary" ghost>
                        Details
                      </Button>
                    </Link>
                  </Col>
                  <Col span={12}>
                    <Link to={`/group/edit/${item.id}`}>
                      <Button icon="edit" block type="primary">
                        Edit
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))
      ) : (
        <Empty />
      )}
    </Row>
  );
};

MyGroupsComponent.propTypes = {
  groups: PropTypes.array
};

export default MyGroupsComponent;
