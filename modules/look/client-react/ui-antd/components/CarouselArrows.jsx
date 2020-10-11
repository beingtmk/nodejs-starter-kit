import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

export const LeftArrow = ({ prevSlide }) => {
  return (
    <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
      <Icon type="left" className="carousel-arrow-icon" />
    </div>
  );
};

LeftArrow.propTypes = {
  prevSlide: PropTypes.func
};

export const RightArrow = ({ nextSlide }) => {
  return (
    <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
      <Icon type="right" className="carousel-arrow-icon" />
    </div>
  );
};

RightArrow.propTypes = {
  nextSlide: PropTypes.func
};
