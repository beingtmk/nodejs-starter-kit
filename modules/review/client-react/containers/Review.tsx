import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ReviewView from '../components/ReviewView';

interface ReviewProps {
  t: TranslateFunction;
}

class Review extends React.Component<ReviewProps> {
  public render() {
    return <ReviewView {...this.props} />;
  }
}

export default translate('review')(Review);
