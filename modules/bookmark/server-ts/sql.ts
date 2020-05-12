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
import Blog from '@gqlapp/blog-server-ts/sql';

Model.knex(knex);

const eager = '[user, blog.[author, model]]';

export interface UserBookmark {
  userId: number;
  blogId: number;
}

export interface Identifier {
  id: number;
}

export default class Bookmark extends Model {
  // private id: any;

  static get tableName() {
    return 'blog_bookmark';
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
          from: 'blog_bookmark.user_id',
          to: 'user.id'
        }
      },
      blog: {
        relation: Model.BelongsToOneRelation,
        modelClass: Blog,
        join: {
          from: 'blog_bookmark.blog_id',
          to: 'blog.id'
        }
      }
    };
  }

  public async blogBookmarks() {
    return camelizeKeys(
      await Bookmark.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async blogBookmark(id: number) {
    const res = camelizeKeys(
      await Bookmark.query()
        .findById(id)
        .eager(eager)
    );
    return res;
  }

  public async userBlogBookmarks(id: number) {
    const res = camelizeKeys(
      await Bookmark.query()
        .where({ user_id: id })
        .eager(eager)
    );
    return res;
  }

  public async userBlogBookmark(input: UserBookmark) {
    const res = camelizeKeys(
      await Bookmark.query()
        .where(decamelizeKeys(input))
        .eager(eager)
        .first()
    );
    return res;
  }

  public async addBlogBookmark(input: UserBookmark) {
    const res = await Bookmark.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteBlogBookmarkWithId(id: number) {
    return knex('blog_bookmark')
      .where({ id })
      .del();
  }

  public async deleteBlogBookmark(input: UserBookmark) {
    return knex('blog_bookmark')
      .where(decamelizeKeys(input))
      .del();
  }
}
