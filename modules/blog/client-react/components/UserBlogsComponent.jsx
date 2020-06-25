import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';

import { Col, Row, Divider } from 'antd';
import MiniBlogsCardComponent from './MiniBlogsCardComponent';
import BlogRefCardComponent from './BlogRefCardComponent';

const UserBlogsComponent = ({ author }) => {
  return (
    <Row>
      {' '}
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 16, offset: 4 }}
      >
        <BlogRefCardComponent user={author} />
      </Col>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 22, offset: 1 }}
        lg={{ span: 20, offset: 2 }}
      >
        <h1>
          <br />
          <strong>{`Blogs by ${author.firstname} ${author.lastname}`}</strong>
          <br /> <Divider />
        </h1>
        <Row gutter={32}>
          {author.blogs.map(item => (
            <MiniBlogsCardComponent key={item.id} moreFlag={false} blog={item} />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

UserBlogsComponent.propTypes = {
  author: PropTypes.object,
  t: PropTypes.func
};

export default translate('blog')(UserBlogsComponent);
