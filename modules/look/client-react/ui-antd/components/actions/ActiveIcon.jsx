import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

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

    let icon = 'CloseOutlined';
    if (active !== 'false') {
      icon = 'CheckOutlined';
    } else color = 'danger';
    return (
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="QuestionCircleOutlined" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button type={color} htmlType={type} size={buttonSize} icon={<Icon type={icon} />} shape="circle" {...props} />
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
