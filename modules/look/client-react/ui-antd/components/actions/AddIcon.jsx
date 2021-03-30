import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Icon from '../Icon';

class AddIcon extends React.Component {
  render() {
    const { color = 'primary', shape = 'circle', type, size, ...props } = this.props;

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
        icon={<Icon type="PlusOutlined" />}
        shape={shape}
        {...props}
      />
    );
  }
}

AddIcon.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  shape: PropTypes.string
};

export default AddIcon;
