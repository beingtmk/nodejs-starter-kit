import { knex } from '@gqlapp/database-server-ts';

export default class Events {
  public eventss() {
    return knex.select();
  }
}
