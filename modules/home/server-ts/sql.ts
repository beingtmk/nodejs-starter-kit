import { knex } from '@gqlapp/database-server-ts';

export default class Home {
  public homes() {
    return knex.select();
  }
}
