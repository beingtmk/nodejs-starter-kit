import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Empty from './Empty';
import Button from './Button';

const EmptyComponent = ({ description, emptyLink }) => (
  <div className="HVCenter">
    <Empty description={description}>
      <Link to={`${emptyLink}`}>
        <Button color="primary">Add</Button>
      </Link>
    </Empty>
  </div>
);

EmptyComponent.propTypes = { description: PropTypes.string, emptyLink: PropTypes.string };

export default EmptyComponent;
