import React from 'react';
import PropTypes from 'prop-types';
import { Radio as ADRadio } from 'antd';

const Radio = ({ children, type, ...props }) => {
  if (type === 'group') return <ADRadio.Group {...props}>{children}</ADRadio.Group>;
  if (type === 'button') return <ADRadio.Button {...props}>{children}</ADRadio.Button>;
  else return <ADRadio {...props}>{children}</ADRadio>;
};

Radio.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};
export default Radio;
