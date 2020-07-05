import React from 'react';
import PropTypes from 'prop-types';
import { Steps as ADSteps } from 'antd';

const Steps = ({ children, ...props }) => {
  return <ADSteps {...props}>{children}</ADSteps>;
};
Steps.propTypes = {
  children: PropTypes.node
};
export default Steps;
