import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row } from '@gqlapp/look-client-react';

import { Card, Avatar, Button, Divider, Tag } from 'antd';
import BlogRefCardComponent from './BlogRefCardComponent';
import MiniBlogsCardComponent from './MiniBlogsCardComponent';

const { Meta } = Card;

const BlogComponent = ({ setClap, blog, moreBlogs }) => {
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
          <span>
            <Button
              type={blog.clapFlag ? 'primary' : 'secondary'}
              shape="circle"
              icon="like"
              size="large"
              ghost={blog.clapFlag ? true : false}
              onClick={() => setClap()}
              style={{ marginRight: '10px' }}
            />
            <strong>{`${blog.claps}`}</strong>
          </span>
        </Card>
        <BlogRefCardComponent user={blog.author} />
        <BlogRefCardComponent model={blog.model} />
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
            <MiniBlogsCardComponent key={item.id} blog={item} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

BlogComponent.propTypes = {
  blog: PropTypes.object,
  moreBlogs: PropTypes.array,
  setClap: PropTypes.func,
  t: PropTypes.func
};

// PMH 142 CMH 257

export default translate('blog')(BlogComponent);
