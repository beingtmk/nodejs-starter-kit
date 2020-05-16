import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
import { UserBookmark, Identifier } from './sql';

const BLOG_BOOK_SUBSCRIPTION = 'blogBookmark_subscription';

interface UserBookmarkInput {
  input: UserBookmark;
}

interface UserIdInput {
  userId: number;
}

export default (pubsub: PubSub) => ({
  Query: {
    async blogBookmarks(obj: any, args: any, context: any) {
      return context.Bookmark.blogBookmarks();
    },
    async blogBookmark(obj: any, { id }: Identifier, context: any) {
      return context.Bookmark.blogBookmark(id);
    },
    async userBlogBookmark(obj: any, { input }: UserBookmarkInput, { Bookmark, req: { identity } }: any) {
      if (!input.userId && (!identity || !identity.id)) {
        return null;
      }
      input.userId = input.userId ? input.userId : identity.id;
      const res = await Bookmark.userBlogBookmark(input);
      return res;
    },
    userBlogBookmarks: withAuth(async (obj: any, { userId }: UserIdInput, { Bookmark, req: { identity } }: any) => {
      if (!userId) {
        userId = identity.id;
      }
      return Bookmark.userBlogBookmarks(userId);
    })
  },
  Mutation: {
    addBlogBookmark: withAuth(async (obj: any, { input }: UserBookmarkInput, { auth, Bookmark }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }
        const id = await Bookmark.addBlogBookmark(input);
        const item = await Bookmark.blogBookmark(id);
        pubsub.publish(BLOG_BOOK_SUBSCRIPTION, {
          blogBookmarksUpdated: {
            mutation: 'CREATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteBlogBookmarkWithId: withAuth(async (obj: any, { id }: Identifier, { Bookmark }: any) => {
      try {
        const item = await Bookmark.blogBookmark(id);
        await Bookmark.deleteBlogBookmarkWithId(id);
        pubsub.publish(BLOG_BOOK_SUBSCRIPTION, {
          blogBookmarksUpdated: {
            mutation: 'DELETED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteBlogBookmark: withAuth(async (obj: any, { input }: UserBookmarkInput, { auth, Bookmark }: any) => {
      try {
        if (!input.userId) {
          input.userId = auth.isAuthenticated.id;
        }
        const item = await Bookmark.userBlogBookmark(input);
        await Bookmark.deleteBlogBookmark(input);
        pubsub.publish(BLOG_BOOK_SUBSCRIPTION, {
          blogBookmarksUpdated: {
            mutation: 'DELETED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    blogBookmarksUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(BLOG_BOOK_SUBSCRIPTION),
        (payload, variables) => {
          return payload.blogBookmarksUpdated.id === variables.id;
        }
      )
    }
  }
});
