import { knex } from '@gqlapp/database-server-ts';

export default class Category {
  public categorys() {
    return knex.select();
  }
}
