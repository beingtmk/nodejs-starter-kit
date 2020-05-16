import {
  camelizeKeys,
  decamelizeKeys
  //  decamelize
} from 'humps';
import {
  Model
  // raw
} from 'objection';
import {
  knex
  // returnId
  //  orderedFor
} from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';

Model.knex(knex);

export interface UserLike {
  type: string;
  userId: number;
  typeId: number;
}

export interface TypeLike {
  type: string;
  typeId: number;
}

export interface Identifier {
  id: number;
}

const eager = '[user]';

export default class Like extends Model {
  // private id: any;

  static get tableName() {
    return 'like';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'like.user_id',
          to: 'user.id'
        }
      }
    };
  }

  public async likes() {
    return camelizeKeys(
      await Like.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async like(id: number) {
    const res = camelizeKeys(
      await Like.query()
        .findById(id)
        .eager(eager)
    );
    return res;
  }

  public async likeUsingUser(input: UserLike) {
    const res = camelizeKeys(
      await Like.query()
        .where(decamelizeKeys(input))
        .eager(eager)
        .first()
    );
    return res;
  }

  public async conditionLikes(input: UserLike) {
    return camelizeKeys(
      await Like.query()
        .where(decamelizeKeys(input))
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async addLike(input: UserLike) {
    const res = await Like.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteLike(id: number) {
    return knex('like')
      .where({ id })
      .del();
  }

  public async deleteLikeUser(input: UserLike) {
    return knex('like')
      .where(decamelizeKeys(input))
      .del();
  }
}
