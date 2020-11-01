import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

class SubmitButton extends React.Component {
  render() {
    const { children = 'Submit', confirm = false, type, color = 'primary', size, onClick, ...props } = this.props;

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
          icon={<Icon type="EnterOutlined" />}
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

SubmitButton.propTypes = {
  confirm: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default SubmitButton;
