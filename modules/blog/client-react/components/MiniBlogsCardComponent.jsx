import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// import {  } from "@gqlapp/look-client-react";
import { Col, Row, Card, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import MiniBlogImageComponent from './MiniBlogImageComponent';
import BlogActionsComponent from './BlogActionsComponent';

const { Meta } = Card;

const MiniBlogsCardComponent = ({ blog, moreFlag }) => {
  const blogData = () => {
    return (
      <>
        <Tooltip placement="bottomLeft" title={blog.title}>
          <h1>
            <strong>
              {blog.title.substring(0, 24)}
              {blog.title.length > 24 && '...'}
            </strong>
          </h1>
        </Tooltip>
        <br />
        <Meta
          avatar={<Avatar src={blog.author.image} />}
          title={
            <span>
              {blog.author.profile && `${blog.author.profile.firstName} ${blog.author.profile.lastName} `}
              <i>({blog.author.username}) </i>
            </span>
          }
          description={<span>{`${moment(blog.createdAt).format("MMM DD, 'YY")} - ${blog.readTime} read`}</span>}
        />
        <Divider />
        <BlogActionsComponent blog={blog} />
      </>
    );
  };
  return (
    <div>
      <Col xs={24} sm={0} md={0} lg={8}>
        <Card
          hoverable
          title={`${moreFlag == true ? 'More from' : 'Category:'} ${blog.model.name}`}
          cover={<MiniBlogImageComponent height={240} title={blog.title} image={blog.image} />}
          style={{ marginBottom: '20px' }}
        >
          {blogData()}
        </Card>
      </Col>
      <Col xs={0} sm={24} md={24} lg={0}>
        <Card hoverable style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={12}>
              <h3>{`${moreFlag == true ? 'More from' : 'Category:'} ${blog.model.name}`}</h3>
              {blogData()}
            </Col>
            <Col style={{ margin: 0 }} span={12}>
              <MiniBlogImageComponent height={250} title={blog.title} image={blog.image} />
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

MiniBlogsCardComponent.propTypes = {
  blog: PropTypes.object,
  moreFlag: PropTypes.bool,
  t: PropTypes.func
};

export default translate('blog')(MiniBlogsCardComponent);
