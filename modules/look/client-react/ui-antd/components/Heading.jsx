import React from 'react';
import PropTypes from 'prop-types';
import Underline from './underline';

const Heading = ({ children, type, ...props }) => {
  if (type === '2')
    return (
      <Underline {...props}>
        <h2>{children}</h2>
      </Underline>
    );
  if (type === '3')
    return (
      <Underline {...props}>
        <h3>{children}</h3>
      </Underline>
    );
  else
    return (
      <Underline {...props}>
        <h1 {...props}>{children}</h1>
      </Underline>
    );
};

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};

export default Heading;
