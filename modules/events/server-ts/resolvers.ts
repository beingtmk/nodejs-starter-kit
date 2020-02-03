import withAuth from 'graphql-auth';

import { Event, EventParticipant } from './sql';
import { Identifier } from './sql';

interface EventInput {
  input: Event;
}

interface EventParticipantInput {
  input: EventParticipant;
}

interface EventInputWithId {
  input: Event & Identifier;
}

export default (pubsub: any) => ({
  Query: {
    async events(obj: any, {  }: any, context: any) {
      const events = await context.Events.events();
      return events;
    },
    async event(obj: any, { id }: Identifier, { Events }: any) {
      const events = await Events.event(id);
      return events;
    },
    async participants(obj: any, { id }: Identifier, { Events }: any) {
      const participants = await Events.participants(id);
      return participants;
    }
  },
  Mutation: {
    addEvent: withAuth(async (obj: any, { input }: EventInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        // const id =
        await context.Events.addEvent(input);
        // console.log('event id', id);
        // const event = await context.Events.event(id);
        // publish for resources list
        // pubsub.publish(Events_SUBSCRIPTION, {
        //   eventsUpdated: {
        //     mutation: 'CREATED',
        //     id,
        //     node: event
        //   }
        // });
        // return event;
        return true;
      } catch (e) {
        return e;
      }
    }),
    editEvent: withAuth(async (obj: any, { input }: EventInputWithId, context: any) => {
      try {
        await context.Events.editEvent(input);
        // const resource = await context.Events.resource(input.id);
        return true;
      } catch (e) {
        return e;
      }
    }),
    addParticipant: withAuth(async (obj: any, { input }: EventParticipantInput, context: any) => {
      try {
        if (!input.userId) {
          input.userId = context.identity.id;
        }
        await context.Events.addParticipant(input);
        return true;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
