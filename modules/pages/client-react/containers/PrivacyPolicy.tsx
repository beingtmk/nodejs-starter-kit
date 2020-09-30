import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import PrivacyPolicyView from '../components/PrivacyPolicyView';

interface PrivacyPolicyProps {
  t: TranslateFunction;
}

class PrivacyPolicy extends React.Component<PrivacyPolicyProps> {
  public render() {
    return <PrivacyPolicyView {...this.props} />;
  }
}

export default translate('pages')(PrivacyPolicy);
