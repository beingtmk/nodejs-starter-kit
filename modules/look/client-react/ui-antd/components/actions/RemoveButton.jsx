import React from 'react';
import PropTypes from 'prop-types';

import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

class RemoveButton extends React.Component {
  render() {
    const { children = 'Remove', confirm = false, type, color = 'danger', size, onClick, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }
    const ADButton = ({ onClick }) => {
      return (
        <Button
          type={color}
          htmlType={type}
          block
          size={buttonSize}
          icon={<Icon type="MinusOutlined" />}
          {...props}
          onClick={onClick}
        >
          {children}
        </Button>
      );
    };
    if (confirm)
      return (
        <Popconfirm
          title="Are you sure？"
          icon={<Icon type="QuestionCircleOutlined" style={{ color: 'red' }} />}
          onConfirm={onClick}
        >
          <ADButton />
        </Popconfirm>
      );
    else return <ADButton onClick={onClick} />;
  }
}

RemoveButton.propTypes = {
  confirm: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default RemoveButton;
