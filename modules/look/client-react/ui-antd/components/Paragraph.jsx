import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

const ADParagraph = Typography.Paragraph;

const Paragraph = ({ children, ...props }) => {
  return <ADParagraph {...props}>{children}</ADParagraph>;
};

Paragraph.propTypes = {
  children: PropTypes.node
};

export default Paragraph;
