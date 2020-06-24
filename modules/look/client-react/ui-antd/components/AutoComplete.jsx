import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete as ADAutoComplete } from 'antd';

const AutoComplete = ({ children, ...props }) => {
  return <ADAutoComplete {...props}>{children}</ADAutoComplete>;
};

AutoComplete.propTypes = {
  children: PropTypes.node
};
export default AutoComplete;
