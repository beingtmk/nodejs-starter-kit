import { knex } from '@gqlapp/database-server-ts';

export default class Setting {
  public settings() {
    return knex.select();
  }
}
