import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import OrderView from '../components/OrderView';

interface OrderProps {
  t: TranslateFunction;
}

class Order extends React.Component<OrderProps> {
  public render() {
    return <OrderView {...this.props} />;
  }
}

export default translate('order')(Order);
