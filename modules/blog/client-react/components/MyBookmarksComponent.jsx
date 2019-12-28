import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row } from 'antd';
import MiniBlogsCardComponent from './MiniBlogsCardComponent';

const MyBookmarksComponent = ({ moreBlogs }) => {
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      >
        <h1>
          <strong>Bookmarked Items</strong>
          <br />
          <br />
        </h1>
        <Row gutter={32}>
          {moreBlogs.map(item => (
            <MiniBlogsCardComponent key={item.id} moreFlag={false} blog={item} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

MyBookmarksComponent.propTypes = {
  moreBlogs: PropTypes.array,
  t: PropTypes.func
};

export default translate('blog')(MyBookmarksComponent);
