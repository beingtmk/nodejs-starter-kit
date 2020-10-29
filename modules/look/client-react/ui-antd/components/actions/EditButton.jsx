import React from 'react';
import PropTypes from 'prop-types';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

class EditButton extends React.Component {
  render() {
    const { children = 'Edit', type, color = 'primary', size, ...props } = this.props;

    let buttonSize = 'default';
    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Button type={color} htmlType={type} block size={buttonSize} icon={<EditOutlined />} {...props}>
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
