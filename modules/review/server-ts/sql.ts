import { knex } from '@gqlapp/database-server-ts';

export default class Review {
  public reviews() {
    return knex.select();
  }
}
