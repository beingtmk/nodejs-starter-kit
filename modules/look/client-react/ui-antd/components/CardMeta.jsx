import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

const ADCardMeta = Card.Meta;
const CardMeta = ({ children, ...props }) => {
  return <ADCardMeta {...props}>{children}</ADCardMeta>;
};

CardMeta.propTypes = {
  children: PropTypes.node
};
export default CardMeta;
