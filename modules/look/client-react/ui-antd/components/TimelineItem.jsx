import React from 'react';
import PropTypes from 'prop-types';
import { Timeline } from 'antd';

const TimelineItem = ({ children, ...props }) => {
  return <Timeline.Item {...props}>{children}</Timeline.Item>;
};

TimelineItem.propTypes = {
  children: PropTypes.node
};
export default TimelineItem;
