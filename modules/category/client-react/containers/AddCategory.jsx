import React from 'react';
import PropTypes from 'prop-types';

import { Message } from '@gqlapp/look-client-react';
import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import ROUTES from '../routes';
import AddCategoryView from '../components/AddCategoryView';
import { withAddCategory } from './CategoryOpertations';

const AddCategory = props => {
  const { addCategory, history } = props;
  const handleSubmit = values => {
    console.log(values);
    try {
      Message.destroy();
      Message.loading('Please wait...', 0);
      delete values.id;
      addCategory(values);
      Message.destroy();
      Message.success('Category added.');
      history.push(`${ROUTES.adminPanel}`);
    } catch (e) {
      throw Error(e);
    }
  };

  // console.log('props', props);
  return <AddCategoryView onSubmit={handleSubmit} {...props} />;
};

AddCategory.propTypes = {
  addCategory: PropTypes.func,
  history: PropTypes.object
};

export default compose(withAddCategory, translate('category'))(AddCategory);
