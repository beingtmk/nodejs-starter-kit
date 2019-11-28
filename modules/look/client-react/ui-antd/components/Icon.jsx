import React from 'react';
import PropTypes from 'prop-types';
import { Icon as ADIcon } from 'antd';

const Icon = ({ ...props }) => {
  console.log('icon', props);
  return <ADIcon type={props.type} />;
};

Icon.propTypes = {
  type: PropTypes.string
};

export default Icon;
