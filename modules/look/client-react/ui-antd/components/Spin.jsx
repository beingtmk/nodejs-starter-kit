import React from 'react';
import PropTypes from 'prop-types';
import { Spin as ADSpin } from 'antd';

const Spin = ({ children, ...props }) => {
  return <ADSpin {...props}>{children}</ADSpin>;
};

Spin.propTypes = {
  children: PropTypes.node
};
export default Spin;
