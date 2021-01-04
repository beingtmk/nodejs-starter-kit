import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import SettingView from '../components/SettingView';

interface SettingProps {
  t: TranslateFunction;
}

class Setting extends React.Component<SettingProps> {
  public render() {
    return <SettingView {...this.props} />;
  }
}

export default translate('setting')(Setting);
