import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
import { Col, Row } from '@gqlapp/look-client-react';

import { Card, Avatar, Button, Divider, Tooltip } from 'antd';

const { Meta } = Card;
const BlogRefCardComponent = ({ blog }) => {
  const [clap, increClap] = useState(blog.claps);
  const [clapFlag, increclapFlag] = useState(blog.clapFlag);
  const setClap = () => {
    increClap(clap + (!clapFlag ? 1 : -1));
    increclapFlag(!clapFlag);
  };

  const blogData = () => {
    return (
      <>
        <Tooltip placement="bottomLeft" title={blog.title}>
          <h1>
            <strong>
              {blog.title.substring(0, 24)}
              {blog.title.length > 24 && '...'}
            </strong>
          </h1>
        </Tooltip>
        <br />
        <Meta
          avatar={<Avatar src={blog.author.image} />}
          title={
            <span>
              {`${blog.author.firstname} ${blog.author.lastname} `}
              <i>({blog.author.username}) </i>
            </span>
          }
          description={<span>{`${blog.createdAt} - ${blog.readTime} read`}</span>}
        />
        <Divider />
        <span>
          <Button
            type={clapFlag ? 'primary' : 'secondary'}
            shape="circle"
            icon="like"
            size="large"
            ghost={clapFlag ? true : false}
            onClick={() => setClap()}
            style={{ marginRight: '10px' }}
          />
          <strong>{`${clap}`}</strong>
        </span>
      </>
    );
  };
  const blogImage = () => <img style={{ height: '250px', width: '100%' }} alt={blog.title} src={blog.image} />;
  return (
    <div style={{ marginBottom: '20px' }}>
      <Col xs={0} sm={0} md={0} lg={8}>
        <Card hoverable title={`More from ${blog.model.name}`} cover={blogImage()}>
          {blogData()}
        </Card>
      </Col>
      <Col sm={24} md={24} lg={0} xs={0}>
        <Card bodyStyle={{ padding: '0 !important' }}>
          <Row>
            <Col span={12}>
              <h3>{`More from ${blog.model.name}`}</h3>
              {blogData()}
            </Col>
            <Col style={{ margin: 0 }} span={12}>
              {blogImage()}
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
};

BlogRefCardComponent.propTypes = {
  blog: PropTypes.object,
  t: PropTypes.func
};

export default translate('blog')(BlogRefCardComponent);
