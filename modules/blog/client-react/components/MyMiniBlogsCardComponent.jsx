import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row, Card, Button, Tooltip } from 'antd';
import { status } from '../constants';

const MyMiniBlogsCardComponent = ({ blog }) => {
  const blogData = () => {
    return (
      <>
        <Tooltip placement="bottomLeft" title={blog.title}>
          <h2>
            <strong>
              {blog.title.substring(0, 24)}
              {blog.title.length > 24 && '...'}
            </strong>
          </h2>
        </Tooltip>
        <h3>{`${blog.createdAt} - ${blog.readTime} read`}</h3>
        <br />
        <Row gutter={16}>
          <Col xs={10} lg={12} sm={10} md={10}>
            <Button
              type={'primary'}
              icon="edit"
              size="default"
              ghost
              block
              //   onClick={() => setClap()}
            >
              Edit
            </Button>
          </Col>
          <Col xs={14} sm={12}>
            <Button
              type={'danger'}
              icon="delete"
              size="default"
              ghost
              block
              //   onClick={() => setClap()}
            >
              Delete
            </Button>
          </Col>
          <Col xs={24} lg={24} sm={22} md={22}>
            <br />
            <Button
              type={'primary'}
              icon={blog.status != status[1] ? 'book' : 'stop'}
              size="default"
              block
              //   onClick={() => setClap()}
            >
              {console.log(blog.status)}
              {console.log(status[1])}
              {blog.status != status[1] ? 'Publish' : 'Disable'}
            </Button>
          </Col>
          {blog.status == status[1] && (
            <Col xs={24} lg={24} sm={22} md={22}>
              <br />
              <Button
                type={'default'}
                icon="share-alt"
                size="default"
                block
                //   onClick={() => setClap()}
              >
                Share
              </Button>
            </Col>
          )}
        </Row>
      </>
    );
  };
  const blogImage = () => <img style={{ height: '280px', width: '100%' }} alt={blog.title} src={blog.image} />;
  return (
    <div>
      <Col xs={24} sm={0} md={0} lg={8}>
        <Card hoverable title={`Category: ${blog.model.name}`} cover={blogImage()} style={{ marginBottom: '20px' }}>
          <div style={{ height: '250px', width: '100%' }}>{blogData()}</div>
        </Card>
      </Col>
      <Col xs={0} sm={24} md={24} lg={0}>
        <Card hoverable style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={12}>
              <h3>{`Category: ${blog.model.name}`}</h3>
              {blogData()}
            </Col>
            <Col style={{ margin: 0 }} span={12}>
              {blogImage()}
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

MyMiniBlogsCardComponent.propTypes = {
  blog: PropTypes.object,
  t: PropTypes.func
};

export default translate('blog')(MyMiniBlogsCardComponent);
