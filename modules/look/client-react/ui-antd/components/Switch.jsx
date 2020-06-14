import React from 'react';
import PropTypes from 'prop-types';
import { Switch as ADSwitch } from 'antd';

const Switch = ({ defaultChecked, loading, size, ...props }) => {
  return <ADSwitch defaultChecked={defaultChecked} loading={loading} size={size} {...props} />;
};

Switch.propTypes = {
  defaultChecked: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.string
};
export default Switch;
