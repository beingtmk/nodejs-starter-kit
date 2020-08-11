import ClientModule from '@gqlapp/module-client-react';

import { onAppCreate, onAppCreateGroupLayout } from './look';
import resources from './locales';
export * from './look';

export { default as LayoutCenter } from './LayoutCenter';
export { default as Loading } from './Loading';

export default new ClientModule({ onAppCreate: [onAppCreate, onAppCreateGroupLayout], localization: [{ ns: 'user', resources }] });
