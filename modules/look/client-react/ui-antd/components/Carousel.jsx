import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ADCarousel } from 'antd';

import { LeftArrow, RightArrow } from './CarouselArrows';

const Carousel = props => {
  let carousel = React.useRef();
  const { children, showArrow = true, ...rest } = props;

  const prevSlide = () => {
    carousel.prev();
  };

  const nextSlide = () => {
    carousel.next();
  };

  return (
    <>
      {showArrow && <LeftArrow prevSlide={prevSlide} />}
      <ADCarousel ref={node => (carousel = node)} {...rest}>
        {children}
      </ADCarousel>
      {showArrow && <RightArrow nextSlide={nextSlide} />}
    </>
  );
};
Carousel.propTypes = {
  children: PropTypes.node,
  showArrow: PropTypes.bool
};

export default Carousel;
