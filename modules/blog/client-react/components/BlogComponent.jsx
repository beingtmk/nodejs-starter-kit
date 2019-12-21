import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row } from '@gqlapp/look-client-react';

import { Card, Avatar, Button, Divider } from 'antd';

const { Meta } = Card;

const BlogComponent = ({ setClap, blog }) => {
  return (
    <Row>
      <Col
        xs={{ span: 22, offset: 1 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 20, offset: 2 }}
        lg={{ span: 16, offset: 4 }}
      >
        <Card cover={<img alt={blog.title} src={blog.image} />}>
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
      </Col>
    </Row>
  );
};

BlogComponent.propTypes = {
  blog: PropTypes.object,
  setClap: PropTypes.func,
  t: PropTypes.func
};

export default translate('blog')(BlogComponent);
