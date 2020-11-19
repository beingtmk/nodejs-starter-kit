import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { Spinner } from '@gqlapp/look-client-react';

import CategoryTreeComponentView from '../components/CategoryTreeComponentView';
import { withCategories } from './CategoryOpertations';
import { subscribeToCategories } from './CategorySubscriptions';

const CategoryTreeComponent = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  return !props.loading && props.categories ? <CategoryTreeComponentView {...props} /> : <Spinner size="small" />;
};

CategoryTreeComponent.propTypes = {
  categoriesUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func,
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  loading: PropTypes.bool,
  categories: PropTypes.object
};

export default compose(withCategories)(CategoryTreeComponent);
