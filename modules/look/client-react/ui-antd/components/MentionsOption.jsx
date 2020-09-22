import React from 'react';
import PropTypes from 'prop-types';
import { Mentions } from 'antd';

const { Option } = Mentions;

const MentionsOption = ({ children, ...props }) => {
  return <Option {...props}>{children}</Option>;
};

MentionsOption.propTypes = {
  children: PropTypes.node
};

export default MentionsOption;
