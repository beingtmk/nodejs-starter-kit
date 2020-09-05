import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withReviews } from './ReviewOperations';

const ReviewContainer = props => {
  return React.cloneElement(props.children, { ...props });
};

ReviewContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any
};
export default compose(withReviews, translate('review'))(ReviewContainer);
