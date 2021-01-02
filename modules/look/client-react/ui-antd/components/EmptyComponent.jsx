import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Empty from './Empty';
import Button from './Button';

const EmptyComponent = ({ description, emptyLink, showAddBtn = false, btnText = 'Add', applyClass = true }) => (
  <div className={applyClass && 'HVCenter'}>
    <Empty description={description}>
      {showAddBtn && (
        <Link to={`${emptyLink}`}>
          <Button color="primary">{btnText}</Button>
        </Link>
      )}
    </Empty>
  </div>
);

EmptyComponent.propTypes = {
  description: PropTypes.string,
  emptyLink: PropTypes.string,
  showAddBtn: PropTypes.bool,
  applyClass: PropTypes.bool,
  btnText: PropTypes.string
};

export default EmptyComponent;
