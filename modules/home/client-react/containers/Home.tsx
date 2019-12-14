import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import HomeView from '../components/HomeView';

interface HomeProps {
  t: TranslateFunction;
}

class Home extends React.Component<HomeProps> {
  public render() {
    return <HomeView {...this.props} />;
  }
}

export default translate('home')(Home);
