import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ADCarousel } from 'antd';

const Carousel = ({ children, afterChange, autoplay, dotPosition, effect, ...props }) => {
  return (
    <ADCarousel afterChange={afterChange} dotPosition={dotPosition} effect={effect} autoplay={autoplay} {...props}>
      {children}
    </ADCarousel>
  );
};
Carousel.propTypes = {
  children: PropTypes.node,
  afterChange: PropTypes.func,
  dotPosition: PropTypes.string,
  effect: PropTypes.string,
  autoplay: PropTypes.bool
};

export default Carousel;
