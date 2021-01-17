import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { enquireScreen } from 'enquire-js';

import Icon from './Icon';
import Button from './Button';

const BgIcon = styled(Icon)`
  font-size: 25px;
`;

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export const LeftArrow = ({ prevSlide }) => {
  return !isMobile ? (
    <Button onClick={prevSlide} shape="circle" color="primary" size={'lg'}>
      <BgIcon type="LeftOutlined" className="carousel-arrow-icon" />
    </Button>
  ) : null;
};

LeftArrow.propTypes = {
  prevSlide: PropTypes.func
};

export const RightArrow = ({ nextSlide }) => {
  return !isMobile ? (
    <Button onClick={nextSlide} shape="circle" color="primary" size={'lg'}>
      <BgIcon type="RightOutlined" className="carousel-arrow-icon" />
    </Button>
  ) : null;
};

RightArrow.propTypes = {
  nextSlide: PropTypes.func
};
