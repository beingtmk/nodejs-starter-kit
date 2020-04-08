import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

const C_REPLY_SUBSCRIPTION = 'reply_comment_subscription';
const BLOG_C_SUBSCRIPTION = 'blog_comment_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async comments(obj: any, args: any, context: any) {
      return context.Comment.comments();
    },
    async blogComments(obj: any, { blogId }: any, { Comment }: any) {
      return Comment.blogComments(blogId);
    },
    async comment(obj: any, { id }: any, context: any) {
      return context.Comment.comment(id);
    },
    async commentReplies(obj: any, { referenceId }: any, context: any) {
      return context.Comment.commentReplies(referenceId);
    }
  },
  Mutation: {
    addComment: withAuth(async (obj: any, { input }: any, { auth, Comment }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }

        const blogId = input.blogId;
        const referenceId = input.referenceId;
        delete input.blogId;
        delete input.referenceId;

        if (blogId && referenceId) {
          throw new Error('Error in decision');
        }
        if (!blogId && !referenceId) {
          throw new Error('Reference error');
        }

        const commentId = await Comment.addComment(input);
        const item = await Comment.comment(commentId);

        let data;
        let id;
        if (blogId) {
          id = await Comment.addBlogComment({ blogId, commentId });
          data = await Comment.blogComment(id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'CREATED',
              node: data
            }
          });
        } else {
          id = await Comment.addReplyComment({ referenceId, commentId });
          data = await Comment.replyComment(id);
          pubsub.publish(C_REPLY_SUBSCRIPTION, {
            replyCommentUpdated: {
              mutation: 'CREATED',
              node: data
            }
          });
        }

        return item;
      } catch (e) {
        return e;
      }
    }),
    editComment: withAuth(async (obj: any, { input }: any, { Comment }: any) => {
      try {
        const ref = input.ref;
        if (ref !== 'BLOG' && ref !== 'REPLY') {
          throw new Error('Reference error');
        }
        delete input.ref;

        await Comment.editComment(input);
        const item = await Comment.comment(input.id);

        let data;
        if (ref === 'BLOG') {
          data = await Comment.blogCommentWithCid(input.id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'UPDATED',
              node: data
            }
          });
        } else {
          data = await Comment.replyCommentCid(input.id);
          pubsub.publish(C_REPLY_SUBSCRIPTION, {
            replyCommentUpdated: {
              mutation: 'UPDATED',
              node: data
            }
          });
        }
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteComment: withAuth(async (obj: any, { id, ref }: any, { Comment }: any) => {
      try {
        const item = await Comment.comment(id);

        let data;
        if (ref === 'BLOG') {
          data = await Comment.blogCommentWithCid(id);
          await Comment.deleteBlogCommentWithCid(id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'DELETED',
              node: data
            }
          });
        } else {
          data = await Comment.replyCommentCid(id);
          await Comment.deleteReplyCommentWithCid(id);
          pubsub.publish(C_REPLY_SUBSCRIPTION, {
            replyCommentUpdated: {
              mutation: 'DELETED',
              node: data
            }
          });
        }

        await Comment.deleteComment(id);

        return item;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    replyCommentUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(C_REPLY_SUBSCRIPTION),
        (payload, variables) => {
          return payload.replyCommentUpdated.id === variables.id;
        }
      )
    },
    blogCommentUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(BLOG_C_SUBSCRIPTION),
        (payload, variables) => {
          return payload.blogCommentUpdated.id === variables.id;
        }
      )
    }
  }
});
