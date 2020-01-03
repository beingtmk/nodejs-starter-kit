import { knex } from '@gqlapp/database-server-ts';

export default class Resources {
  public resourcess() {
    return knex.select();
  }
}
