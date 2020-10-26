import React from 'react';
import PropTypes from 'prop-types';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { enquireScreen } from 'enquire-js';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export const LeftArrow = ({ prevSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-left" onClick={prevSlide}>
      <LeftOutlined className="carousel-arrow-icon" />
    </div>
  ) : null;
};

LeftArrow.propTypes = {
  prevSlide: PropTypes.func
};

export const RightArrow = ({ nextSlide }) => {
  return !isMobile ? (
    <div className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
      <RightOutlined className="carousel-arrow-icon" />
    </div>
  ) : null;
};

RightArrow.propTypes = {
  nextSlide: PropTypes.func
};
