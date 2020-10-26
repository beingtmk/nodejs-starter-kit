import React from 'react';
import PropTypes from 'prop-types';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Button, Popconfirm } from 'antd';

class ActiveIcon extends React.Component {
  render() {
    const { type, size, active = 'false', onClick, ...props } = this.props;
    let { color = 'primary' } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    let icon = 'close';
    if (active !== 'false') {
      icon = 'check';
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

ActiveIcon.propTypes = {
  active: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default ActiveIcon;
