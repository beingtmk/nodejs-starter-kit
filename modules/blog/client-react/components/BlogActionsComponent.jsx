import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Col, Row, Icon, Dropdown } from 'antd';

import Likes from '@gqlapp/like-client-react/containers/Likes';
import BlogBookmark from '@gqlapp/bookmark-client-react/containers/BlogBookMark';

const BlogActionsComponent = ({ blog }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Share the blog</Menu.Item>
      <Menu.Item key="2">Report the blog</Menu.Item>
    </Menu>
  );

  const LikeValues = {
    type: 'BLOG',
    typeId: blog.id
  };
  return (
    <span>
      <Row gutter={16}>
        <Col span={12}>
          <Likes LikeValues={LikeValues} />
        </Col>
        <Col xs={12} lg={12} sm={10} md={10}>
          <div style={{ float: 'right' }}>
            <BlogBookmark blogId={blog.id} />
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="ellipsis" style={{ fontSize: '25px', marginLeft: '10px' }} />
            </Dropdown>
          </div>
        </Col>
      </Row>
    </span>
  );
};

BlogActionsComponent.propTypes = {
  blog: PropTypes.object
};

export default BlogActionsComponent;
