import React from 'react';
import PropTypes from 'prop-types';
import { Comment as ADComment } from 'antd';

const Comment = ({ children, ...props }) => {
  return <ADComment {...props}>{children}</ADComment>;
};

Comment.propTypes = {
  children: PropTypes.node
};
export default Comment;
