import React from 'react';
import PropTypes from 'prop-types';
import { Col as ADCol } from 'antd';

const Col = ({ children, ...props }) => {
  // const newProps = props;
  // if (xs) newProps.xs = xs * 2;
  // if (md) newProps.md = md * 2;
  // if (xs === 0) newProps.xs = 0;
  // if (md === 0) newProps.md = 0;
  return <ADCol {...props}>{children}</ADCol>;
};

Col.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number,
  md: PropTypes.number
};

export default Col;
