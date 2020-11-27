import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import EditCategoryView from '../components/EditCategoryView';
import { withEditCategory, withCategory } from './CategoryOpertations';
import { subscribeToCategory } from './CategorySubscriptions';

const EditCategory = props => {
  const { editCategory, history, subscribeToMore, category } = props;
  useEffect(() => {
    const subscribe = subscribeToCategory(subscribeToMore, category && category.id, history);
    return () => subscribe();
  });

  const handleSubmit = values => {
    try {
      Message.destroy();
      Message.loading('Please wait...', 0);
      if (values.parentCategoryId === 0) {
        values.parentCategoryId = null;
      }
      console.log(values);
      editCategory(values);
      Message.destroy();
      Message.success('Category edited.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <EditCategoryView onSubmit={handleSubmit} {...props} />;
};

EditCategory.propTypes = {
  editCategory: PropTypes.func,
  subscribeToMore: PropTypes.func,
  history: PropTypes.object,
  category: PropTypes.object
};

export default compose(withEditCategory, withCategory, translate('category'))(EditCategory);
