import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'antd';

const Step = ({ children, ...props }) => {
  return <Steps.Step {...props}>{children}</Steps.Step>;
};

Step.propTypes = {
  children: PropTypes.node
};
export default Step;
