import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';

import { withCategories } from './CategoryOpertations';
import { subscribeToCategories } from './CategorySubscriptions';

import CategoryNavBarComponentView from '../components/CategoryNavBarComponentView';

const CategoryNavBarComponent = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  return <CategoryNavBarComponentView {...props} />;
};

CategoryNavBarComponent.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};
export default compose(withCategories)(CategoryNavBarComponent);
