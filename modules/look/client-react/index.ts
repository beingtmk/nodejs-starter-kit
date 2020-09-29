import ClientModule from '@gqlapp/module-client-react';

import { onAppCreateArr } from './look';
import resources from './locales';
export * from './look';

export { default as LayoutCenter } from './LayoutCenter';
export { default as Loading } from './Loading';

export default new ClientModule({ onAppCreate: onAppCreateArr, localization: [{ ns: 'user', resources }] });
