import React from 'react';
import PropTypes from 'prop-types';
import { Image as ADImage } from 'antd';

const Image = ({ children, ...props }) => {
  return <ADImage {...props}>{children}</ADImage>;
};

Image.propTypes = {
  children: PropTypes.node
};
export default Image;
