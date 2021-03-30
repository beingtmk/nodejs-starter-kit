import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

class PublishButton extends React.Component {
  render() {
    const { children = 'Publish', type, publish = 'false', size, onClick, ...props } = this.props;
    let { color = 'primary' } = this.props;
    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    let icon = 'StopOutlined';
    if (publish !== 'false') {
      icon = 'ExportOutlined';
    } else color = 'danger';
    return (
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="QuestionCircleOutlined" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button type={color} htmlType={type} block size={buttonSize} icon={<Icon type={icon} />} {...props}>
          {children}
        </Button>
      </Popconfirm>
    );
  }
}

PublishButton.propTypes = {
  publish: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default PublishButton;
