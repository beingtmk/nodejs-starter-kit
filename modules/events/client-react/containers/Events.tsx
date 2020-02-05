import React from 'react';
import { graphql } from 'react-apollo';
import { removeTypename, PLATFORM, compose } from '@gqlapp/core-common';

import { translate, TranslateFunction } from '@gqlapp/i18n-client-react';
import EventsView from '../components/EventsView.web';

import EVENTS_QUERY from '../graphql/EventsQuery.graphql';

interface EventsProps {
  t: TranslateFunction;
}

class Events extends React.Component<EventsProps> {
  public render() {
    // console.log('props', this.props);
    return <EventsView {...this.props} />;
  }
}

export default compose(
  graphql(EVENTS_QUERY, {
    props({ data: { loading, error, events } }) {
      if (error) {
        throw new Error(error);
      }
      return { loading, events };
    }
  }),
  translate('events')
)(Events);
