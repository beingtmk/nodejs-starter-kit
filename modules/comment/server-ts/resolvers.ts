import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

const C_REPLY_SUBSCRIPTION = 'reply_comment_subscription';
const BLOG_C_SUBSCRIPTION = 'blog_comment_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async comments(obj: any, args: any, context: any) {
      return context.ContentComment.comments();
    },
    async blogComments(obj: any, { blogId }: any, { ContentComment }: any) {
      return ContentComment.blogComments(blogId);
    },
    async comment(obj: any, { id }: any, context: any) {
      return context.ContentComment.comment(id);
    },
    async commentReplies(obj: any, { referenceId }: any, context: any) {
      return context.ContentComment.commentReplies(referenceId);
    }
  },
  Mutation: {
    addContentComment: withAuth(async (obj: any, { input }: any, { auth, ContentComment }: any) => {
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

        const commentId = await ContentComment.addComment(input);
        const item = await ContentComment.comment(commentId);

        let data;
        let id;
        if (blogId) {
          id = await ContentComment.addBlogComment({ blogId, commentId });
          data = await ContentComment.blogComment(id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'CREATED',
              node: data
            }
          });
        } else {
          id = await ContentComment.addReplyComment({ referenceId, commentId });
          data = await ContentComment.replyComment(id);
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
    editContentComment: withAuth(async (obj: any, { input }: any, { ContentComment }: any) => {
      try {
        const ref = input.ref;
        if (ref !== 'BLOG' && ref !== 'REPLY') {
          throw new Error('Reference error');
        }
        delete input.ref;

        const id = await ContentComment.editComment(input);

        const item = await ContentComment.comment(id);

        let data;
        if (ref === 'BLOG') {
          data = await ContentComment.blogCommentWithCid(id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'UPDATED',
              node: data
            }
          });
        } else {
          data = await ContentComment.replyCommentCid(id);
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
    deleteContentComment: withAuth(async (obj: any, { id, ref }: any, { ContentComment }: any) => {
      try {
        const item = await ContentComment.comment(id);

        let data;
        if (ref === 'BLOG') {
          data = await ContentComment.blogCommentWithCid(id);
          await ContentComment.deleteBlogCommentWithCid(id);
          pubsub.publish(BLOG_C_SUBSCRIPTION, {
            blogCommentUpdated: {
              mutation: 'DELETED',
              node: data
            }
          });
        } else {
          data = await ContentComment.replyCommentCid(id);
          await ContentComment.deleteReplyCommentWithCid(id);
          pubsub.publish(C_REPLY_SUBSCRIPTION, {
            replyCommentUpdated: {
              mutation: 'DELETED',
              node: data
            }
          });
        }

        await ContentComment.deleteComment(id);

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
