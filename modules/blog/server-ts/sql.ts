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
  knex,
  returnId
  //  orderedFor
} from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
// import { has } from 'lodash';

Model.knex(knex);

// const eager = '[author.[profile], model]';
const eager = '[author, model]';

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
  }

  public async blog(id: number) {
    const res = camelizeKeys(
      await Blog.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addBlog(input: any) {
    const res = await returnId(knex('blog').insert(decamelizeKeys(input)));
    return res;
  }

  public async editBlog(id: number, input: any) {
    const res = await returnId(
      knex('blog')
        .where({ id })
        .update(decamelizeKeys(input))
    );
    return res;
  }

  public async deleteBlog(id: number) {
    return knex('blog')
      .where({ id })
      .del();
  }

  public async models() {
    return camelizeKeys(await ModelDAO.query().orderBy('id', 'desc'));
  }

  public async model(id: number) {
    const res = camelizeKeys(
      await ModelDAO.query()
        .findById(id)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addModel(input: any) {
    const res = await returnId(knex('model').insert(input));
    return res;
  }

  public async updateModel(id: number, input: any) {
    const res = await returnId(
      knex('model')
        .where({ id })
        .update(input)
    );
    return res;
  }

  public async deleteModel(id: number) {
    return knex('model')
      .where({ id })
      .del();
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
