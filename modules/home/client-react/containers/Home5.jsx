import React from 'react';

import { translate } from '@gqlapp/i18n-client-react';
import Home5View from '../components/Home5View';

const Home5 = props => {
  return <Home5View {...props} />;
};

export default translate('home')(Home5);
