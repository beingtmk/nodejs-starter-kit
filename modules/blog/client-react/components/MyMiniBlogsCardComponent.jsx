import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row, Card, Button, Tooltip, Alert, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { status } from '../constants';
import MiniBlogImageComponent from './MiniBlogImageComponent';

const MyMiniBlogsCardComponent = ({ blog, deleteBlog, editBlog }) => {
  const cancel = () => {
    message.error('Task cancelled');
  };

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
        <h3>{`${moment(blog.createdAt).format('MMM DD, YYYY')}`}</h3>
        <br />
        <Row gutter={16}>
          <Col xs={10} lg={12} sm={10} md={10}>
            <Link to={`/blog/edit/${blog.id}`}>
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
            </Link>
          </Col>
          <Col xs={14} sm={12}>
            <Popconfirm
              title="Delete blog?"
              onConfirm={() => deleteBlog(blog.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type={'danger'} icon="delete" size="default" ghost block>
                Delete
              </Button>
            </Popconfirm>
          </Col>
          {blog.status != status[1] && (
            <Col xs={24} lg={24} sm={22} md={22}>
              <br />
              <Alert message={blog.status.charAt(0).toUpperCase() + blog.status.slice(1)} type="warning" />
            </Col>
          )}
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
          <Col xs={12} lg={12} sm={11} md={11}>
            {' '}
            <br />
            <Button
              type={'primary'}
              icon={blog.status != status[1] ? 'book' : 'stop'}
              size="default"
              block
              onClick={() =>
                editBlog({
                  id: blog.id,
                  status: blog.status != status[1] ? status[1] : status[2]
                })
              }
            >
              {blog.status != status[1] ? 'Publish' : 'Disable'}
            </Button>
          </Col>
          <Col xs={12} lg={12} sm={11} md={11}>
            <br />
            <Link to={`/blog/${blog.id}`}>
              <Button block type="primary" ghost>
                Read
              </Button>
            </Link>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <div>
      <Col xs={24} sm={0} md={0} lg={8}>
        <Card
          hoverable
          title={`Category: ${blog.model.name}`}
          cover={<MiniBlogImageComponent height={260} title={blog.title} image={blog.image} />}
          style={{ marginBottom: '20px' }}
        >
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
              <MiniBlogImageComponent height={275} title={blog.title} image={blog.image} />
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

MyMiniBlogsCardComponent.propTypes = {
  blog: PropTypes.object,
  t: PropTypes.func,
  deleteBlog: PropTypes.func,
  editBlog: PropTypes.func
};

export default translate('blog')(MyMiniBlogsCardComponent);
