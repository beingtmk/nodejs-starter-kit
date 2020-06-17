import React from 'react';
import PropTypes from 'prop-types';
import Underline from './underline';

const Heading = ({ children, type, ...props }) => {
  if (type === '2')
    return (
      <Underline>
        <h2 {...props}>{children}</h2>
      </Underline>
    );
  if (type === '3')
    return (
      <Underline>
        <h3 {...props}>{children}</h3>
      </Underline>
    );
  else
    return (
      <Underline>
        <h1 {...props}>{children}</h1>
      </Underline>
    );
};

Heading.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string
};

export default Heading;
