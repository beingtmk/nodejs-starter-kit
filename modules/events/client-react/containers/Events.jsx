import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';
import { compose } from '@gqlapp/core-common';

import { translate } from '@gqlapp/i18n-client-react';
import EventsView from '../components/EventsView.web';

import EVENTS_QUERY from '../graphql/EventsQuery.graphql';
import DELETE_EVENT from '../graphql/DeleteEvent.graphql';

class Events extends React.Component {
  render() {
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
  graphql(DELETE_EVENT, {
    props: ({ mutate }) => ({
      deleteEvent: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteEvent: {
              id,
              __typename: 'Event'
            }
          },

          update: store => {
            // Get previous events from cache
            const prevEvents = store.readQuery({ query: EVENTS_QUERY });
            // Write events to cache

            store.writeQuery({
              query: EVENTS_QUERY,
              data: { events: prevEvents.events.filter(event => event.id !== id), __typename: 'Events' }
            });
          }
        });
        message.warning('Event deleted.');
      }
    })
  }),
  translate('events')
)(Events);
