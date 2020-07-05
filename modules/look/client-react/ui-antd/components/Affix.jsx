import React from 'react';
import PropTypes from 'prop-types';
import { Affix as ADAffix } from 'antd';

const Affix = ({ children, ...props }) => {
  return <ADAffix {...props}>{children}</ADAffix>;
};

Affix.propTypes = {
  children: PropTypes.node
};
export default Affix;
