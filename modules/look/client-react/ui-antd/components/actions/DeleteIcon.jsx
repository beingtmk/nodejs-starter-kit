import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class DeleteIcon extends React.Component {
  render() {
    const { type, size, onClick, ...props } = this.props;

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
        <Button type="danger" htmlType={type} size={buttonSize} icon="delete" shape="circle" {...props} />
      </Popconfirm>
    );
  }
}

DeleteIcon.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default DeleteIcon;
