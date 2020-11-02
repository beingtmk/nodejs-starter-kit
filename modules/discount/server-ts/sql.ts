import { knex } from '@gqlapp/database-server-ts';

export default class Discount {
  public discounts() {
    return knex.select();
  }
}
