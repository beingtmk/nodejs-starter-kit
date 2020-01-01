import React from 'react';
import PropTypes from 'prop-types';

const MiniBlogImageComponent = props => {
  return <img style={{ height: `${props.height}px`, width: '100%' }} alt={props.title} src={props.image} />;
};

MiniBlogImageComponent.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.number
};

export default MiniBlogImageComponent;
