import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Checkbox } from 'antd';

class CheckboxGroup extends Component {
  render() {
    const { options, defaultValue, ...props } = this.props;
    return <Checkbox.Group options={options} defaultValue={defaultValue} {...props} />;
  }
}

export default CheckboxGroup;

CheckboxGroup.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.array
};
