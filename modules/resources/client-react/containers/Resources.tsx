import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ResourcesView from '../components/ResourcesView';

interface ResourcesProps {
  t: TranslateFunction;
}

class Resources extends React.Component<ResourcesProps> {
  public render() {
    return <ResourcesView {...this.props} />;
  }
}

export default translate('resources')(Resources);
