import React from 'react';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';

import Icon from './Icon';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export const LeftArrow = ({ prevSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
      <Icon type="LeftOutlined" className="carousel-arrow-icon" />
    </div>
  ) : null;
};

LeftArrow.propTypes = {
  prevSlide: PropTypes.func
};

export const RightArrow = ({ nextSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
      <Icon type="RightOutlined" className="carousel-arrow-icon" />
    </div>
  ) : null;
};

RightArrow.propTypes = {
  nextSlide: PropTypes.func
};
