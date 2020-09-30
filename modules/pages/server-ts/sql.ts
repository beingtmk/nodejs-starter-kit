import { knex } from '@gqlapp/database-server-ts';

export default class Pages {
  public pagess() {
    return knex.select();
  }
}
