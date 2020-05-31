import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';

import ForgotPasswordView from '../components/ForgotPasswordView';

const PasswordReset = props => {
  console.log('props', props);
  return <ForgotPasswordView {...props} />;
};

export default translate('demo')(PasswordReset);
