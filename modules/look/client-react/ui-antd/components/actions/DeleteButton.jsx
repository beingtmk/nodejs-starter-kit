import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class DeleteButton extends React.Component {
  render() {
    const {
      children = 'Delete',
      type,
      color = 'danger',
      size,
      onClick,
      title = 'Are you sure？',
      ...props
    } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Popconfirm title={title} icon={<Icon type="question-circle-o" style={{ color: 'red' }} />} onConfirm={onClick}>
        <Button type={color} htmlType={type} block size={buttonSize} icon="delete" {...props}>
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
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default DeleteButton;
