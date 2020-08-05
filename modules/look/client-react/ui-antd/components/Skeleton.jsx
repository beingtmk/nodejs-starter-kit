import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton as ADSkeleton } from 'antd';

const Skeleton = ({ children, ...props }) => {
  return <ADSkeleton {...props}>{children}</ADSkeleton>;
};

Skeleton.propTypes = {
  children: PropTypes.node
};

export default Skeleton;
