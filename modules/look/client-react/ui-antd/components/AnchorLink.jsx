import React from 'react';
import { Anchor } from 'antd';

const { Link } = Anchor;

const AnchorLink = ({ ...props }) => {
  return <Link {...props} />;
};

export default AnchorLink;
