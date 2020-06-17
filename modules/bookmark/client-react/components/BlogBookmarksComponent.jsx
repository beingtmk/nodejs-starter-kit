import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row, Empty } from 'antd';
import MiniBlogsCardComponent from '@gqlapp/blog-client-react/components/MiniBlogsCardComponent';

const MyBookmarksComponent = ({ userBlogBookmarks }) => {
  return (
    <Row gutter={32} justify="start" className="blog-list-row">
      <div style={{ marginBottom: '30px', marginLeft: '16px' }}>
        <h1 style={{ fontSize: '32px' }}>Blogs</h1>

        <div align="left">
          <div key="line" className="title-line-wrapper" style={{ width: '150px' }} align="left">
            <div
              className="title-line "
              // style={{ transform: "translateX(-64px)" }}
            />
          </div>
        </div>
      </div>
      {userBlogBookmarks ? (
        userBlogBookmarks.map(item => (
          <Col xs={24} md={12} lg={8}>
            <MiniBlogsCardComponent key={item.id} moreFlag={false} blog={item.blog} />
          </Col>
        ))
      ) : (
        <Empty />
      )}
    </Row>
  );
};

MyBookmarksComponent.propTypes = {
  userBlogBookmarks: PropTypes.array,
  t: PropTypes.func
};

export default translate('blog')(MyBookmarksComponent);
