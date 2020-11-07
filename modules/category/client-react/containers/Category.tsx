import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import CategoryView from '../components/CategoryView';

interface CategoryProps {
  t: TranslateFunction;
}

class Category extends React.Component<CategoryProps> {
  public render() {
    return <CategoryView {...this.props} />;
  }
}

export default translate('category')(Category);
