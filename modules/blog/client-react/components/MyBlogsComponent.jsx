import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Row, Tabs, Empty, Icon } from 'antd';
import MyMiniBlogsCardComponent from './MyMiniBlogsCardComponent';
import { status } from '../constants';

const { TabPane } = Tabs;

const MyBlogsComponent = ({ blogs, deleteBlog, editBlog }) => {
  return (
    <Row gutter={32} className="blog-list-row">
      <div style={{ marginBottom: '30px', marginLeft: '16px' }}>
        <h1 style={{ fontSize: '32px' }}><Icon type="solution" /> {' My Blogs'}</h1>

        <div align="left">
          <div key="line" className="title-line-wrapper" style={{ width: '200px' }} align="left">
            <div
              className="title-line "
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="all" size="large" className="my-blogs-tabs">
        <TabPane tab="All" key="all">
          {blogs ? (
            blogs.map(item => (
              <MyMiniBlogsCardComponent key={item.id} blog={item} deleteBlog={deleteBlog} editBlog={editBlog} />
            ))
          ) : (
            <Empty />
          )}
        </TabPane>
        {status.map(item => (
          <TabPane tab={item.charAt(0).toUpperCase() + item.slice(1)} key={item}>
            <Row gutter={32}>
              {blogs ? (
                blogs
                  .filter(val => val.status == item)
                  .map(item => (
                    <MyMiniBlogsCardComponent key={item.id} blog={item} deleteBlog={deleteBlog} editBlog={editBlog} />
                  ))
              ) : (
                <Empty />
              )}
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </Row>
  );
};

MyBlogsComponent.propTypes = {
  blogs: PropTypes.array,
  t: PropTypes.func,
  editBlog: PropTypes.func,
  deleteBlog: PropTypes.func
};

export default translate('blog')(MyBlogsComponent);
