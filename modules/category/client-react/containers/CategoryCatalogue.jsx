import React from 'react';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CategoryCatalogueView from '../components/CategoryCatalogueView';
import { withCategory } from './CategoryOpertations';

const CategoryCatalogue = props => {
  console.log('props', props);
  return <CategoryCatalogueView {...props} />;
};

export default compose(withCategory, translate('category'))(CategoryCatalogue);
