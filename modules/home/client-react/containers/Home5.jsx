import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import HomeView5 from '../components/HomeView5';

const Home5 = props => {
  return <HomeView5 {...props} />;
};

export default translate('home')(Home5);
