import React from 'react';
import PropTypes from 'prop-types';
import { Tag as ADTag } from 'antd';

const { CheckableTag } = ADTag;

const Tag = ({ children, Checkable, ...props }) => {
  if (Checkable) return <CheckableTag {...props}>{children}</CheckableTag>;
  else return <ADTag {...props}>{children}</ADTag>;
};

Tag.propTypes = {
  children: PropTypes.node,
  Checkable: PropTypes.bool
};
export default Tag;
