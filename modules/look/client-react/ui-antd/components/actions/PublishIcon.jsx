import React from 'react';
import PropTypes from 'prop-types';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button, Popconfirm } from 'antd';

class PublishIcon extends React.Component {
  render() {
    const { type, size, publish = 'false', onClick, ...props } = this.props;
    let { color = 'primary' } = this.props;
    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    let icon = 'stop';
    if (publish !== 'false') {
      icon = 'export';
    } else color = 'danger';
    return (
      <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={onClick}>
        <Button
          type={color}
          htmlType={type}
          size={buttonSize}
          icon={<LegacyIcon type={icon} />}
          shape="circle"
          {...props}
        />
      </Popconfirm>
    );
  }
}

PublishIcon.propTypes = {
  publish: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default PublishIcon;
