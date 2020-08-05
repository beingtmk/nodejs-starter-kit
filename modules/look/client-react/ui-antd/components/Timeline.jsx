import React from 'react';
import PropTypes from 'prop-types';
import { Timeline as ADTimeline } from 'antd';

const Timeline = ({ children, ...props }) => {
  return <ADTimeline {...props}>{children}</ADTimeline>;
};
Timeline.propTypes = {
  children: PropTypes.node
};
export default Timeline;
