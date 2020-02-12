import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row, Tabs } from 'antd';
import MyMiniBlogsCardComponent from './MyMiniBlogsCardComponent';
import { status } from '../constants';

const { TabPane } = Tabs;

const MyBlogsView = ({ blogs, deleteBlog, editBlog }) => {
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      >
        <h1>
          <strong>My Blogs</strong>
          <br />
          <br />
        </h1>
        <Row gutter={32}>
          <Tabs defaultActiveKey="all" size="large">
            <TabPane tab="All" key="all">
              {blogs.map(item => (
                <MyMiniBlogsCardComponent
                  key={item.id}
                  moreFlag={false}
                  blog={item}
                  deleteBlog={deleteBlog}
                  editBlog={editBlog}
                />
              ))}
            </TabPane>
            {status.map(item => (
              <TabPane tab={item.charAt(0).toUpperCase() + item.slice(1)} key={item}>
                {blogs
                  .filter(val => val.status == item)
                  .map(item => (
                    <MyMiniBlogsCardComponent key={item.id} blog={item} editBlog={editBlog} deleteBlog={deleteBlog} />
                  ))}
              </TabPane>
            ))}
          </Tabs>
        </Row>
      </Col>
    </Row>
  );
};

MyBlogsView.propTypes = {
  blogs: PropTypes.array,
  t: PropTypes.func,
  editBlog: PropTypes.func,
  deleteBlog: PropTypes.func
};

export default translate('blog')(MyBlogsView);
