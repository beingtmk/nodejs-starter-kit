import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ADCarousel } from 'antd';

import Row from './Row';
import Col from './Col';
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
    <Row type="flex" justify="center" align="middle">
      {showArrow && (
        <Col span={1} align="center">
          <LeftArrow prevSlide={prevSlide} />
        </Col>
      )}
      <Col span={showArrow ? 22 : 24} align="center">
        <ADCarousel ref={node => (carousel = node)} {...rest}>
          {children}
        </ADCarousel>
      </Col>
      {showArrow && (
        <Col span={1} align="center">
          <RightArrow nextSlide={nextSlide} />
        </Col>
      )}
    </Row>
  );
};
Carousel.propTypes = {
  children: PropTypes.node,
  showArrow: PropTypes.bool
};

export default Carousel;
