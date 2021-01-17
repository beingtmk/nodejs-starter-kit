import React from 'react';
import { PropTypes } from 'prop-types';

import { translate } from '@gqlapp/i18n-client-react';
import { compose } from '@gqlapp/core-common';
import { removeEmpty } from '@gqlapp/listing-client-react';

import SettingView from '../components/SettingView';
import { withEditPlatform, withPlatform } from './SettingOperations';

const Setting = props => {
  const { editPlatform } = props;

  const handleSubmit = values => {
    console.log(removeEmpty(values));
    try {
      editPlatform(values);
    } catch (e) {
      throw Error(e);
    }
  };
  // console.log('props', props);
  return <SettingView onSubmit={handleSubmit} {...props} />;
};

Setting.propTypes = {
  editPlatform: PropTypes.func
};

export default compose(withPlatform, withEditPlatform, translate('setting'))(Setting);
