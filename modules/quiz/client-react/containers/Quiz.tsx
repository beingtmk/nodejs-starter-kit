import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import QuizView from '../components/QuizView';

interface QuizProps {
  t: TranslateFunction;
}

class Quiz extends React.Component<QuizProps> {
  public render() {
    return <QuizView {...this.props} />;
  }
}

export default translate('quiz')(Quiz);
