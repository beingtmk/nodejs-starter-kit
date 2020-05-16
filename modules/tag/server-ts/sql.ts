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
// import { has } from 'lodash';
import Blog from '@gqlapp/blog-server-ts/sql';

Model.knex(knex);

const eager = '[blog.[author, model]]';

export class BlogTag extends Model {
  // private id: any;

  static get tableName() {
    return 'blog_tag';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      blog: {
        relation: Model.BelongsToOneRelation,
        modelClass: Blog,
        join: {
          from: 'blog_tag.blog_id',
          to: 'blog.id'
        }
      }
    };
  }

  public async blogTags() {
    return camelizeKeys(
      await BlogTag.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async blogTag(id: number) {
    const res = camelizeKeys(
      await BlogTag.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addBlogTag(input: any) {
    const res = await BlogTag.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async updateBlogTag(input: any) {
    const res = await BlogTag.query().upsertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteBlogTag(id: number) {
    return knex('blog_tag')
      .where({ id })
      .del();
  }
}

const blogTagDAO = new BlogTag();

export default blogTagDAO;
