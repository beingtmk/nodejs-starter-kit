import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import {
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  withEditCategory
} from './CategoryOpertations';
import CategoriesView from '../components/CategoriesView.web';
import { subscribeToCategories } from './CategorySubscriptions';

const Categories = props => {
  const { subscribeToMore, editCategory } = props;
  useEffect(() => {
    const subscribe = subscribeToCategories(subscribeToMore, props.filter);
    return () => subscribe();
  });
  const handleToggle = (field, value, id) => {
    const input = {};
    input.id = id;
    _.set(input, field, value);
    try {
      editCategory(input);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <CategoriesView onToggle={handleToggle} filter={{}} {...props} />;
};
Categories.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  editCategory: PropTypes.func
};

export default compose(
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  withEditCategory,
  translate('category')
)(Categories);
