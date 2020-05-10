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

import { BlogTag } from '@gqlapp/tag-server-ts/sql';

Model.knex(knex);

// const eager = '[author.[profile], model]';
const eager = '[author, model, tags]';

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
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: BlogTag,
        join: {
          from: 'blog.id',
          to: 'blog_tag.blog_id'
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

  public async userBlogs(id: number) {
    return camelizeKeys(
      await Blog.query()
        .where({ author_id: id })
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
    const res = await Blog.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async editBlog(input: any) {
    const res = await Blog.query().upsertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteBlog(id: number) {
    return knex('blog')
      .where({ id })
      .del();
  }
}

export class ModelDAO extends Model {
  static get tableName() {
    return 'model';
  }

  static get idColumn() {
    return 'id';
  }

  public async models() {
    return camelizeKeys(await ModelDAO.query().orderBy('id', 'desc'));
  }

  public async model(id: number) {
    const res = camelizeKeys(
      await ModelDAO.query()
        .findById(id)
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
