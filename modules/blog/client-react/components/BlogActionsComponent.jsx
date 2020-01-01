import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Col, Row, Button, Tooltip, Icon, Dropdown } from 'antd';

const BlogActionsComponent = ({ blog }) => {
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

  return (
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
  );
};

BlogActionsComponent.propTypes = {
  blog: PropTypes.object
};

export default BlogActionsComponent;
