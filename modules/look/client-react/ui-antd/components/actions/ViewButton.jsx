import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'antd';

import Icon from '../Icon';

class ViewButton extends React.Component {
  render() {
    const { children = 'View', type, color = 'primary', size, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Button type={color} htmlType={type} block size={buttonSize} icon={<Icon type="EyeOutlined" />} {...props}>
        {children}
      </Button>
    );
  }
}

ViewButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default ViewButton;
