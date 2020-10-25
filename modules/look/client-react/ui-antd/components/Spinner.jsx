import React from 'react';
import PropTypes from 'prop-types';

import Spin from './Spin';

const Spinner = props => {
  const { size = 'large', ...rest } = props;
  return (
    <div className={'HVCenter'}>
      <Spin size={size} {...rest} />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string
};

export default Spinner;
