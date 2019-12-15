import { knex } from '@gqlapp/database-server-ts';

export default class Blog {
  public blogs() {
    return knex.select();
  }
}
