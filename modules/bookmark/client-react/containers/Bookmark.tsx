import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import BookmarkView from '../components/BookmarkView';

interface BookmarkProps {
  t: TranslateFunction;
}

class Bookmark extends React.Component<BookmarkProps> {
  public render() {
    return <BookmarkView {...this.props} />;
  }
}

export default translate('bookmark')(Bookmark);
