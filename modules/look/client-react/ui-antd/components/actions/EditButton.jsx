import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

class EditButton extends React.Component {
  render() {
    const { children = 'Edit', type, color = 'default', size, ...props } = this.props;

    let buttonSize = 'default';
    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }
    let style = { ...props.style, padding: '0 20px' };

    if (color === 'default') {
      style = {
        ...style,
        border: '1px solid #1890ff',
        color: '#1890ff'
      };
    }

    return (
      <Button type={color} htmlType={type} size={buttonSize} icon="edit" {...props} style={style}>
        {children}
      </Button>
    );
  }
}

EditButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default EditButton;
