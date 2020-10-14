import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spin from './Spin';

const VAlign = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = props => {
  const { size = 'large', ...rest } = props;
  return (
    <VAlign>
      <Spin size={size} {...rest} />
    </VAlign>
  );
};

Spinner.propTypes = {
  size: PropTypes.string
};

export default Spinner;
