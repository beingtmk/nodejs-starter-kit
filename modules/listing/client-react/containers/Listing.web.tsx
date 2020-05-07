import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import ListingView from '../components/ListingView';

interface ListingProps {
  t: TranslateFunction;
}

class Listing extends React.Component<ListingProps> {
  public render() {
    return <ListingView {...this.props} />;
  }
}

export default translate('listing')(Listing);
