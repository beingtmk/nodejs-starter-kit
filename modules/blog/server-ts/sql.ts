import {
  camelizeKeys
  //  decamelizeKeys, decamelize
} from 'humps';
import {
  Model
  // raw
} from 'objection';
import {
  knex
  // returnId, orderedFor
} from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
// import User from '@gqlapp/user-server-ts/sql';
// import { has } from 'lodash';

Model.knex(knex);

const eager = '[author.[profile], model]';
// const eager = '[model]';

export default class Blog extends Model {
  // private id: any;

  static get tableName() {
    return 'blog';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'blog.author_id',
          to: 'user.id'
        }
      },
      model: {
        relation: Model.BelongsToOneRelation,
        modelClass: ModelDAO,
        join: {
          from: 'blog.model_id',
          to: 'model.id'
        }
      }
    };
  }

  public async blogs() {
    return camelizeKeys(
      await Blog.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(set);
    // return set;
  }
}

class ModelDAO extends Model {
  static get tableName() {
    return 'model';
  }

  static get idColumn() {
    return 'id';
  }
}
