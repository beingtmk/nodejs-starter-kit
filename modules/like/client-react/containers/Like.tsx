import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import LikeView from '../components/LikeView';

interface LikeProps {
  t: TranslateFunction;
}

class Like extends React.Component<LikeProps> {
  public render() {
    return <LikeView {...this.props} />;
  }
}

export default translate('like')(Like);
