  
import React from 'react';
import PropTypes from 'prop-types';
import { Button as ADButton } from 'antd';

class Button extends React.Component {
  render() {
    const props = this.props;
    var type;
    var buttonType = this.props.type;
    if(this.props.type === 'submit'){
      type = this.props.type;
      buttonType = 'primary';
    }
    return (
      <ADButton {...props} htmlType = {type} type ={buttonType}>
        {props.children}
      </ADButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default Button;