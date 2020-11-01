import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';

import Icon from '../Icon';

class SubmitIcon extends React.Component {
  render() {
    const { confirm = false, color = 'primary', type, size, onClick, ...props } = this.props;
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
          size={buttonSize}
          icon={<Icon type="EnterOutlined" />}
          shape="circle"
          onClick={onClick}
          {...props}
        />
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

SubmitIcon.propTypes = {
  confirm: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default SubmitIcon;
