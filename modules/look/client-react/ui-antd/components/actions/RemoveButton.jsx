import React from 'react';
import PropTypes from 'prop-types';
import { MinusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

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
          icon={<MinusOutlined />}
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
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
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
