import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting
} from './CategoryOpertations';
import CategoriesView from '../components/CategoriesView.web';
import { subscribeToCategories } from './CategorySubscriptions';

const Categories = props => {
  const { subscribeToMore } = props;

  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  return <CategoriesView filter={{}} {...props} />;
};
Categories.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object
};

export default compose(
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  translate('category')
)(Categories);
