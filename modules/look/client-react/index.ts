import ClientModule from '@gqlapp/module-client-react';

import { onAppCreate } from './look';
import resources from './locales';
export * from './look';

export { default as LayoutCenter } from './LayoutCenter';
export { default as Loading } from './Loading';
export { default as RenderUpload } from './ui-antd/components/RenderUpload';
export { default as RenderUploadMultiple } from './ui-antd/components/RenderUploadMultiple';
export { default as RenderAutoComplete } from './ui-antd/components/RenderAutoComplete';
export { default as RenderDynamicField } from './ui-antd/components/RenderDynamicField';

export default new ClientModule({
  onAppCreate: [onAppCreate],
  localization: [{ ns: 'user', resources }]
});
