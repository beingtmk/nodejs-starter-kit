import React from 'react';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import EventsView from '../components/EventsView';

interface EventsProps {
  t: TranslateFunction;
}

class Events extends React.Component<EventsProps> {
  public render() {
    return <EventsView {...this.props} />;
  }
}

export default translate('events')(Events);
