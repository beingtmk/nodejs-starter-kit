import React from 'react';

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

const Categories = props => {
  // console.log('props', props);
  return <CategoriesView filter={{}} {...props} />;
};

export default compose(
  withCategoriesState,
  withCategories,
  withFilterUpdating,
  withOrderByUpdating,
  withCategoryDeleting,
  translate('category')
)(Categories);
