import React from 'react';
import PropTypes from 'prop-types';
import { Spin as ADSpin } from 'antd';

const Spin = ({ children, size, spinning, delay, tip, ...props }) => {
  return (
    <ADSpin size={size} spinning={spinning} delay={delay} tip={tip} {...props}>
      {children}
    </ADSpin>
  );
};

Spin.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  spinning: PropTypes.bool,
  delay: PropTypes.number,
  tip: PropTypes.string
};
export default Spin;
