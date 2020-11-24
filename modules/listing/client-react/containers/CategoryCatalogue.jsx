import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';
import { withCategory } from '@gqlapp/category-client-react/containers/CategoryOpertations';
import { subscribeToCategory } from '@gqlapp/category-client-react/containers/CategorySubscriptions';

import CategoryCatalogueView from '../components/CategoryCatalogueView';

const CategoryCatalogue = props => {
  // console.log('props', props);
  const { history, subscribeToMore, category } = props;

  useEffect(() => {
    const subscribe = subscribeToCategory(subscribeToMore, category && category.id, history);
    return () => subscribe();
  });

  return <CategoryCatalogueView {...props} />;
};

CategoryCatalogue.propTypes = {
  editCategory: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object,
  category: PropTypes.object
};

export default compose(withCategory, translate('category'))(CategoryCatalogue);
