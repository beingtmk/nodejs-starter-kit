import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class DeleteButton extends React.Component {
  render() {
    const { children = 'Delete', type, size, onClick, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button
          type="default"
          htmlType={type}
          size={buttonSize}
          icon="delete"
          {...props}
          style={{
            padding: '0 20px',
            border: '1px solid #f44336',
            color: '#f44336'
          }}
        >
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
