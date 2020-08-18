import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Icon } from 'antd';

class PublishButton extends React.Component {
  render() {
    const { children = 'Publish', type, color = 'default', publish = 'false', size, onClick, ...props } = this.props;

    let buttonSize = 'default';

    if (size === 'sm') {
      buttonSize = 'small';
    } else if (size === 'lg') {
      buttonSize = 'large';
    }

    let icon = 'stop';
    if (publish !== 'false') {
      icon = 'export';
    }
    return (
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={onClick}
      >
        <Button type={color} htmlType={type} size={buttonSize} icon={icon} {...props}>
          {children}
        </Button>
      </Popconfirm>
    );
  }
}

PublishButton.propTypes = {
  publish: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

export default PublishButton;
