import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';

import LoginView from '../components/LoginView';

const Demo = props => {
  console.log('props', props);
  return <LoginView {...props} />;
};

export default translate('demo')(Demo);
