import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Icon from '../Icon';

class NextIcon extends React.Component {
  render() {
    const { color = 'primary', type, size, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    return (
      <Button
        type={color}
        htmlType={type}
        size={buttonSize}
        icon={<Icon type="ArrowRightOutlined" />}
        shape="circle"
        {...props}
      />
    );
  }
}

NextIcon.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default NextIcon;
