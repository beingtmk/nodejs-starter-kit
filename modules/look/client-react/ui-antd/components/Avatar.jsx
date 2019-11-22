import React from 'react';
import { Avatar as ADAvatar } from 'antd';

const Avatar = ({ ...props }) => {
  console.log(props);
  return <ADAvatar {...props} />;
};

export default Avatar;
