import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import PagesView from '../components/PagesView';

interface PagesProps {
  t: TranslateFunction;
}

class Pages extends React.Component<PagesProps> {
  public render() {
    return <PagesView {...this.props} />;
  }
}

export default translate('pages')(Pages);
