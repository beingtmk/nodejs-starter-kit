import React from 'react';
import PropTypes from 'prop-types';
import { Icon as LegacyIcon } from '@ant-design/compatible';

const Icon = ({ ...props }) => {
  // console.log('icon', props);
  return <LegacyIcon type={props.type} />;
};

Icon.propTypes = {
  type: PropTypes.string
};

export default Icon;
