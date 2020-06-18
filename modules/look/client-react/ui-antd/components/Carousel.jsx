import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ADCarousel } from 'antd';

const Carousel = ({ children, ...props }) => {
  return <ADCarousel {...props}>{children}</ADCarousel>;
};
Carousel.propTypes = {
  children: PropTypes.node
};

export default Carousel;
