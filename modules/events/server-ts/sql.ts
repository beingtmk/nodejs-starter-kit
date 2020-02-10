import { knex } from '@gqlapp/database-server-ts';
import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

// Give the knex object to objection.
Model.knex(knex);

export interface Event {
  userId: number;
  title: string;
  details: string;
  venue: string;
  date: string;
  time: string;
  admins: Admin[];
}

export interface Admin {
  userId: number;
  contactInfo: string;
}

export interface EventParticipant {
  eventId: number;
  userId: number;
}

export interface Identifier {
  id: number;
}
const eager = '[admins, participants]';

export default class Events extends Model {
  static get tableName() {
    return 'events';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      admins: {
        relation: Model.HasManyRelation,
        modelClass: Admins,
        join: {
          from: 'events.id',
          to: 'admins.event_id'
        }
      },
      participants: {
        relation: Model.HasManyRelation,
        modelClass: Participants,
        join: {
          from: 'events.id',
          to: 'participants.event_id'
        }
      }
    };
  }
  // Query functions

  public async events(params: Event) {
    // const res =
    return camelizeKeys(await Events.query().eager(eager));
  }

  public async event(id: number) {
    // const res =
    return camelizeKeys(
      await Events.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async participant(id: number) {
    return camelizeKeys(await Participants.query().where('event_id', '=', id));
  }

  // Mutation functions

  public async addEvent(params: Event) {
    const res = await Events.query().insertGraph(decamelizeKeys(params));
    // console.log('res', res);

    return res;
  }

  public async editEvent(params: Event & Identifier) {
    const res = await Events.query().upsertGraph(decamelizeKeys(params));
    return res;
  }

  public deleteEvent(id: number) {
    return knex('events')
      .where('id', '=', id)
      .del();
  }

  public async addParticipant(params: EventParticipant) {
    const res = await Participants.query().insertGraph(decamelizeKeys(params));
    return res;
  }
}

export class Admins extends Model {
  static get tableName() {
    return 'admins';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: Events,
        join: {
          from: 'admins.event_id',
          to: 'events.id'
        }
      }
    };
  }
}

export class Participants extends Model {
  static get tableName() {
    return 'participants';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.BelongsToOneRelation,
        modelClass: Events,
        join: {
          from: 'participants.event_id',
          to: 'events.id'
        }
      }
    };
  }
}