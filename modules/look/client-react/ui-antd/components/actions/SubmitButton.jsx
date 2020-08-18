import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class SubmitButton extends React.Component {
  render() {
    const { children = 'Submit', confirm = false, type, color = 'default', size, onClick, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }
    const ADButton = ({ onClick }) => {
      return (
        <Button type={color} htmlType={type} size={buttonSize} icon="enter" {...props} onClick={onClick}>
          {children}
        </Button>
      );
    };
    if (confirm)
      return (
        <Popconfirm
          title="Are you sure？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
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
