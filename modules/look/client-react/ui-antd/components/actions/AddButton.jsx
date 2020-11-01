import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Icon from '../Icon';

class AddButton extends React.Component {
  render() {
    const { children = 'Add', type, color = 'primary', size, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Button type={color} htmlType={type} block size={buttonSize} icon={<Icon type="PlusOutlined" />} {...props}>
        {children}
      </Button>
    );
  }
}

AddButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default AddButton;
