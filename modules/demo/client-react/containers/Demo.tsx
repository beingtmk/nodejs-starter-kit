import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import DemoView from '../components/DemoView';

interface DemoProps {
  t: TranslateFunction;
}

class Demo extends React.Component<DemoProps> {
  public render() {
    return <DemoView {...this.props} />;
  }
}

export default translate('demo')(Demo);
