import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import TagView from '../components/TagView';

interface TagProps {
  t: TranslateFunction;
}

class Tag extends React.Component<TagProps> {
  public render() {
    return <TagView {...this.props} />;
  }
}

export default translate('tag')(Tag);
