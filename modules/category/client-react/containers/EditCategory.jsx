import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import EditCategoryView from '../components/EditCategoryView';
import { withEditCategory, withCategory } from './CategoryOpertations';

const EditCategory = props => {
  const { editCategory, history } = props;
  const handleSubmit = values => {
    try {
      Message.destroy();
      Message.loading('Please wait...', 0);
      if (values.parentCategoryId === null) {
        delete values.parentCategoryId;
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
  history: PropTypes.object,
};

export default compose(withEditCategory, withCategory, translate('discount'))(EditCategory);
