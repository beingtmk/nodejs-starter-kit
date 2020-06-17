import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CommentView from '../components/CommentView';

interface CommentProps {
  t: TranslateFunction;
}

class Comment extends React.Component<CommentProps> {
  public render() {
    return <CommentView {...this.props} />;
  }
}

export default translate('comment')(Comment);
