import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class DeleteButton extends React.Component {
  render() {
    const { children = 'Delete', type, color = 'danger', size, onClick, ...props } = this.props;

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
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button type={color} htmlType={type} size={buttonSize} icon="delete" {...props} style={style}>
          {children}
        </Button>
      </Popconfirm>
    );
  }
}

DeleteButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default DeleteButton;
