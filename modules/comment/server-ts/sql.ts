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
// import { has } from 'lodash';

Model.knex(knex);

// const eager = '[author.[profile], model]';
const eager = '[user]';
const blogEager = '[comment[user]]';
const replyEager = '[comment[user]]';

export default class Comment extends Model {
  // private id: any;

  static get tableName() {
    return 'comment';
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
          from: 'comment.user_id',
          to: 'user.id'
        }
      }
    };
  }

  public async comments() {
    return camelizeKeys(
      await Comment.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async comment(id: number) {
    const res = camelizeKeys(
      await Comment.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async blogComments(id: number) {
    return camelizeKeys(
      await BlogComment.query()
        .where({ blog_id: id })
        .eager(blogEager)
        .orderBy('id', 'desc')
    );
  }

  public async blogComment(id: number) {
    const res = camelizeKeys(
      await BlogComment.query()
        .findById(id)
        .eager(blogEager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async blogCommentWithCid(id: number) {
    const res = camelizeKeys(
      await BlogComment.query()
        .eager(blogEager)
        .where({ comment_id: id })
        .first()
    );
    return res;
  }

  public async commentReplies(id: number) {
    return camelizeKeys(
      await ReplyComment.query()
        .where({ reference_id: id })
        .eager(replyEager)
        .orderBy('id', 'desc')
    );
  }

  public async replyComment(id: number) {
    const res = camelizeKeys(
      await ReplyComment.query()
        .findById(id)
        .eager(replyEager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async replyCommentCid(id: number) {
    const res = camelizeKeys(
      await ReplyComment.query()
        .eager(replyEager)
        .where({ comment_id: id })
        .first()
    );
    return res;
  }

  public async addComment(input: any) {
    const res = await Comment.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async addBlogComment(input: any) {
    const res = await BlogComment.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async addReplyComment(input: any) {
    const res = await ReplyComment.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async editComment(id: number, input: any) {
    const res = await Comment.query().upsertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteComment(id: number) {
    return knex('comment')
      .where({ id })
      .del();
  }

  public async deleteBlogComment(id: number) {
    return knex('blog_comment')
      .where({ id })
      .del();
  }

  public async deleteBlogCommentWithCid(id: number) {
    return knex('blog_comment')
      .where({ comment_id: id })
      .del();
  }

  public async deleteReplyComment(id: number) {
    return knex('reply_comment')
      .where({ id })
      .del();
  }

  public async deleteReplyCommentWithCid(id: number) {
    return knex('reply_comment')
      .where({ comment_id: id })
      .del();
  }
}

class BlogComment extends Model {
  static get tableName() {
    return 'blog_comment';
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
          from: 'blog_comment.blog_id',
          to: 'blog.id'
        }
      },
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'blog_comment.comment_id',
          to: 'comment.id'
        }
      }
    };
  }
}

class ReplyComment extends Model {
  static get tableName() {
    return 'reply_comment';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      reference: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'reply_comment.reference_id',
          to: 'comment.id'
        }
      },
      comment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Comment,
        join: {
          from: 'reply_comment.comment_id',
          to: 'comment.id'
        }
      }
    };
  }
}
