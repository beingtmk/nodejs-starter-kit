import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import DiscountView from '../components/DiscountView';

interface DiscountProps {
  t: TranslateFunction;
}

class Discount extends React.Component<DiscountProps> {
  public render() {
    return <DiscountView {...this.props} />;
  }
}

export default translate('discount')(Discount);
