import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row, Empty } from 'antd';
import MiniBlogsCardComponent from './MiniBlogsCardComponent';

const BlogListComponent = ({ blogs }) => {
  return (
    <Row gutter={32} justify="start" className="blog-list-row">
      <div style={{ marginBottom: '30px', marginLeft: '16px' }}>
        <div align="left">
          <div key="line" className="title-line-wrapper" style={{ width: '150px' }} align="left">
            <div className="title-line " />
          </div>
        </div>
      </div>
      {blogs.length > 0 ? (
        blogs.map(item => (
          <Col xs={24} md={12} lg={8}>
            <MiniBlogsCardComponent key={item.id} moreFlag={false} blog={item} />
          </Col>
        ))
      ) : (
        <Empty />
      )}
    </Row>
  );
};

BlogListComponent.propTypes = {
  blogs: PropTypes.array,
  t: PropTypes.func
};

export default translate('blog')(BlogListComponent);
