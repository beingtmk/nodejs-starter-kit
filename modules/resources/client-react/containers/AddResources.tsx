import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import AddResourcesView from '../components/AddResourcesView';

interface ResourcesProps {
  t: TranslateFunction;
}

class Resources extends React.Component<ResourcesProps> {
  public render() {
    return <AddResourcesView {...this.props} />;
  }
}

export default translate('resources')(Resources);
