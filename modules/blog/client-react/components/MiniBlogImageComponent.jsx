import React from 'react';
import PropTypes from 'prop-types';

const MiniBlogImageComponent = props => {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${props.height}px`,
        background: 'grey'
      }}
      align="center"
    >
      <img
        style={{
          height: '100%'
        }}
        alt={props.title}
        src={props.image}
      />
    </div>
  );
};

MiniBlogImageComponent.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  height: PropTypes.number
};

export default MiniBlogImageComponent;
