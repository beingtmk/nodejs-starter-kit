import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { enquireScreen } from 'enquire-js';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export const LeftArrow = ({ prevSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
      <Icon type="left" className="carousel-arrow-icon" />
    </div>
  ) : null;
};

LeftArrow.propTypes = {
  prevSlide: PropTypes.func
};

export const RightArrow = ({ nextSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
      <Icon type="right" className="carousel-arrow-icon" />
    </div>
  ) : null;
};

RightArrow.propTypes = {
  nextSlide: PropTypes.func
};
