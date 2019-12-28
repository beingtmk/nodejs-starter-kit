import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { translate } from '@gqlapp/i18n-client-react';
// import {  } from "@gqlapp/look-client-react";

import { Menu, Col, Row, Card, Avatar, Button, Divider, Tooltip, Icon, Dropdown } from 'antd';

const { Meta } = Card;

const BlogRefCardComponent = ({ blog, moreFlag }) => {
  const [clap, increClap] = useState(blog.claps);
  const [clapFlag, increclapFlag] = useState(blog.clapFlag);
  const setClap = () => {
    increClap(clap + (!clapFlag ? 1 : -1));
    increclapFlag(!clapFlag);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Share the blog</Menu.Item>
      <Menu.Item key="2">Report the blog</Menu.Item>
    </Menu>
  );

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
          <Row gutter={16}>
            <Col span={12}>
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
            </Col>
            <Col xs={12} lg={12} sm={10} md={10}>
              <div style={{ float: 'right' }}>
                <Tooltip placement="bottomLeft" title={clapFlag ? 'Un-bookmark' : 'Bookmark this blog'}>
                  <Icon
                    onClick={() => setClap()}
                    type="safety-certificate"
                    theme={!clapFlag ? 'outlined' : 'filled'}
                    style={{ fontSize: '22px', marginTop: '10px' }}
                  />
                </Tooltip>
                <Dropdown overlay={menu} trigger={['click']}>
                  <Icon type="ellipsis" style={{ fontSize: '25px', marginLeft: '10px' }} />
                </Dropdown>
              </div>
            </Col>
          </Row>
        </span>
      </>
    );
  };
  const blogImage = () => <img style={{ height: '250px', width: '100%' }} alt={blog.title} src={blog.image} />;
  return (
    <div style={{ marginBottom: '20px' }}>
      <Col xs={24} sm={0} md={0} lg={8}>
        <Card
          hoverable
          title={`${moreFlag == false ? 'More from' : 'Category:'} ${blog.model.name}`}
          cover={blogImage()}
        >
          {blogData()}
        </Card>
      </Col>
      <Col xs={0} sm={24} md={24} lg={0}>
        <Card bodyStyle={{ padding: '0 !important' }}>
          <Row>
            <Col span={12}>
              <h3>{`${moreFlag == false ? 'More from' : 'Category:'} ${blog.model.name}`}</h3>
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
  moreFlag: PropTypes.bool,
  t: PropTypes.func
};

export default translate('blog')(BlogRefCardComponent);
