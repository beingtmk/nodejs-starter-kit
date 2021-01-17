import React from 'react';
import { Route } from 'react-router-dom';
import ClientModule from '@gqlapp/module-client-react';
import loadable from '@loadable/component';
import { Spinner } from '@gqlapp/look-client-react';

import resources from './locales';

export default new ClientModule({
  route: [
    <Route
      component={loadable(() => import('./containers/PageNotFound').then(c => c.default), { fallback: <Spinner /> })}
    />
  ],
  localization: [{ ns: 'notFound', resources }]
});
