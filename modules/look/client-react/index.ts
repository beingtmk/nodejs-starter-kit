import ClientModule from '@gqlapp/module-client-react';

import { onAppCreate } from './look';
import resources from './locales';
export * from './look';

export { default as LayoutCenter } from './LayoutCenter';
export { default as Loading } from './Loading';
export { default as New } from './new';

export default new ClientModule({ onAppCreate: [onAppCreate], localization: [{ ns: 'user', resources }] });
