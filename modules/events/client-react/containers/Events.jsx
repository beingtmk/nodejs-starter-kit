import React from 'react';
import { message } from 'antd';
import { graphql } from 'react-apollo';

import { compose } from '@gqlapp/core-common';
import { translate } from '@gqlapp/i18n-client-react';

import CURRENT_USER_QUERY from '@gqlapp/user-client-react/graphql/CurrentUserQuery.graphql';
import TOGGLE_PARTICIPANT from '../graphql/ToggleParticipant.graphql';
import EVENTS_QUERY from '../graphql/EventsQuery.graphql';
import DELETE_EVENT from '../graphql/DeleteEvent.graphql';

import EventsView from '../components/EventsView.web';

class Events extends React.Component {
  render() {
    console.log('props', this.props);
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
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return {
        loading,
        currentUser
      };
    }
  }),
  graphql(TOGGLE_PARTICIPANT, {
    props: ({ mutate }) => ({
      toggleParticipant: async (eventId, userId) => {
        message.destroy();
        message.loading('Please wait...', 0);
        try {
          let {
            data: { toggleParticipant }
          } = await mutate({
            variables: { input: { eventId, userId } },
            optimisticResponse: {
              __typename: 'Mutation',
              toggleParticipant: {
                __typename: 'Event',
                eventId,
                userId
              }
            }
            // ,

            // update: store => {
            //   // Get previous events from cache
            //   const prevEvents = store.readQuery({ query: EVENTS_QUERY });
            //   // Write events to cache
            //   function test(event) {
            //     if (event.id !== eventId) return event;
            //     if (event.id === eventId) {
            //       console.log('object', event.participants.map(p => p.userId === userId));
            //       if (event.participants.map(p => p.userId === userId).includes(true)) {
            //         event.participants = event.participants.filter(p => p.userId !== userId);
            //         return event;
            //       } else {
            //         event.participants.push({ id: Math.random(), eventId, userId, __typename: 'Event' });
            //         return event;
            //       }
            //     }
            //   }
            //   console.log('events in update', prevEvents);
            //   const upEvents = prevEvents.events.filter(event => test(event));

            //   store.writeQuery({
            //     query: EVENTS_QUERY,
            //     data: {
            //       events: upEvents,
            //       __typename: 'Events'
            //     }
            //   });
            //   console.log('upEvents', upEvents);
            // }
          });

          if (toggleParticipant.errors) {
            return { errors: toggleParticipant.errors };
          }
          message.destroy();
          message.success(toggleParticipant);
        } catch (e) {
          console.log(e);
        }
      }
    })
  }),
  translate('events')
)(Events);
