import { knex } from '@gqlapp/database-server-ts';

export default class Comment {
  public comments() {
    return knex.select();
  }
}
