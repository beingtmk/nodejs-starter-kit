import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import { withCategories } from './CategoryOpertations';
import CategoryNavBarComponentView from '../components/CategoryNavBarComponentView';

const CategoryNavBarComponent = props => {
  // console.log('props', props);
  return <CategoryNavBarComponentView {...props} />;
};

export default compose(withCategories, translate('category'))(CategoryNavBarComponent);
