import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row, Card, Avatar, Divider, Tag } from 'antd';
import CommentData from '@gqlapp/comment-client-react/containers/CommentData';
import BlogRefCardComponent from './BlogRefCardComponent';
import MiniBlogsCardComponent from './MiniBlogsCardComponent';
import BlogActionsComponent from './BlogActionsComponent';

const { Meta } = Card;

const BlogComponent = ({ blog, moreBlogs }) => {
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 16, offset: 4 }}
      >
        <Card
          title={
            <a href="#">
              <Avatar size={64} src={blog.model.image} />
              <strong style={{ marginLeft: '20px', fontSize: '30px' }}>{blog.model.name}</strong>
            </a>
          }
          cover={<img alt={blog.title} src={blog.image} />}
        >
          <h1>
            <strong>{blog.title}</strong>
          </h1>
          <br />
          <Meta
            avatar={<Avatar src={blog.author.image} />}
            title={
              <span>
                {`${blog.author.firstname} ${blog.author.lastname} `}
                <i>({blog.author.username}) </i>
              </span>
            }
            description={`${blog.createdAt} - ${blog.readTime} read`}
          />
          <br />
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <Divider />
          {blog.tags.map((item, idx) => (
            <Tag color="#2db7f5" key={idx}>
              {item.name}
            </Tag>
          ))}
          <Divider />
          <BlogActionsComponent blog={blog} />
        </Card>
        <BlogRefCardComponent user={blog.author} />
        <BlogRefCardComponent model={blog.model} />
        <CommentData />
      </Col>

      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      >
        <h1>
          <br />
          <br />
          <strong>More From DemoBlog</strong>
          <br /> <Divider />
        </h1>
        <Row gutter={32}>
          {moreBlogs.map(item => (
            <MiniBlogsCardComponent moreFlag={true} key={item.id} blog={item} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

BlogComponent.propTypes = {
  blog: PropTypes.object,
  moreBlogs: PropTypes.array,
  t: PropTypes.func
};

export default translate('blog')(BlogComponent);
