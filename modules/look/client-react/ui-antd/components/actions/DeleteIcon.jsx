import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

class DeleteIcon extends React.Component {
  render() {
    const { color = 'danger', type, size, onClick, title = 'Are you sure？', ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Popconfirm
        title={title}
        icon={<Icon type="QuestionCircleOutlined" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button
          type={color}
          htmlType={type}
          size={buttonSize}
          icon={<Icon type="DeleteOutlined" />}
          shape="circle"
          {...props}
        />
      </Popconfirm>
    );
  }
}

DeleteIcon.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default DeleteIcon;
