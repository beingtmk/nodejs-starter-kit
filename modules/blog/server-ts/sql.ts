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
import { has } from 'lodash';

import { BlogTag } from '@gqlapp/tag-server-ts/sql';

Model.knex(knex);

export interface BlogInput {
  title: string;
  image: string;
  content: string;
  description: string;
  status: string;
  modelId: number;
  authorId: number;
  tags: TagInput[];
}

export interface FilterInput {
  searchText: string;
  model: string;
  status: string;
}
export interface ModelInput {
  name: string;
  image: string;
  desc: string;
}

export interface TagInput {
  id: number;
  text: string;
}

export interface Identifier {
  id: number;
}
// const eager = '[author.[profile], model]';
const eager = '[author.[profile], model, tags]';

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

  public async blogs(filter: FilterInput, limit: number, after: number) {
    const queryBuilder = Blog.query()
      .eager(eager)
      .orderBy('id', 'desc');

    if (filter) {
      if (has(filter, 'status') && filter.status !== null && filter.status !== '') {
        queryBuilder.from('blog').where(function () {
          this.where('blog.status', filter.status);
        });
      }

      if (has(filter, 'model') && filter.model !== null && filter.model.length !== 0) {
        queryBuilder
          .from('blog')
          .leftJoin('model', 'model.id', 'blog.model_id')
          .where(function () {
            this.where('model.name', filter.model);
          });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder
          .from('blog')
          .leftJoin('user as u', 'u.id', 'blog.author_id')
          .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
          .leftJoin('blog_tag as t', 't.blog_id', 'blog.id')
          .where(function () {
            this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['t.text', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['u.email', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['u.username', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['up.first_name', `%${filter.searchText}%`]))
              .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['up.last_name', `%${filter.searchText}%`]));
          });
      }
    }
    const allBlogs = camelizeKeys(await queryBuilder);
    const total = allBlogs.length;

    var blogs = {};
    if (limit && after) {
      blogs = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    } else if (limit && !after) {
      blogs = camelizeKeys(await queryBuilder.limit(limit));
    } else if (!limit && after) {
      blogs = camelizeKeys(await queryBuilder.offset(after));
    } else {
      blogs = camelizeKeys(await queryBuilder);
    }
    return { blogs, total };
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

  public async addBlog(input: BlogInput) {
    const res = await Blog.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async editBlog(input: Identifier & BlogInput) {
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
    const res = camelizeKeys(await ModelDAO.query().findById(id));
    return res;
  }

  public async addModel(input: ModelInput) {
    const res = await returnId(knex('model').insert(input));
    return res;
  }

  public async updateModel(id: number, input: ModelInput) {
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
