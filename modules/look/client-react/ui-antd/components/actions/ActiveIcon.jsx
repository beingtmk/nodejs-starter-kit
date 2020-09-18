import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

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
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button type={color} htmlType={type} size={buttonSize} icon={icon} shape="circle" {...props} />
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
