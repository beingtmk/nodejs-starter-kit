import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

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
      <Button type={color} htmlType={type} size={buttonSize} icon="plus" {...props}>
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
