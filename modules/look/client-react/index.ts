import ClientModule from '@gqlapp/module-client-react';

import { onAppCreate } from './look';
import resources from './locales';
export { default as MetaTags } from './meta/MetaTags';
export * from './look';

export { default as LayoutCenter } from './LayoutCenter';
export { default as Loading } from './Loading';
export { default as RenderUpload } from './ui-antd/components/RenderUpload';
export { default as RenderUploadMultiple } from './ui-antd/components/RenderUploadMultiple';
export { default as CatalogueWithInfiniteScroll } from './ui-antd/components/CatalogueWithInfiniteScroll';

export default new ClientModule({ onAppCreate: [onAppCreate], localization: [{ ns: 'user', resources }] });
