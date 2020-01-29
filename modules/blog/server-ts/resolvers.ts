import {
  PubSub
  //  withFilter
} from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

export default (pubsub: PubSub) => ({
  Query: {
    async blogs(obj: any, args: any, context: any) {
      return context.Blog.blogs();
    },
    async blog(obj: any, { id }: any, context: any) {
      return context.Blog.blog(id);
    },
    async models(obj: any, args: any, context: any) {
      return context.Blog.models();
    },
    async model(obj: any, { id }: any, context: any) {
      return context.Blog.model(id);
    }
  },
  Mutation: {
    addModel: withAuth(async (obj: any, { input }: any, { Blog }: any) => {
      try {
        const id = await Blog.addModel(input);
        return Blog.model(id);
      } catch (e) {
        return e;
      }
    }),
    updateModel: withAuth(async (obj: any, { input }: any, { Blog }: any) => {
      try {
        const inputId = input.id;
        delete input.id;
        await Blog.updateModel(inputId, input);
        return Blog.model(inputId);
      } catch (e) {
        return e;
      }
    }),
    deleteModel: withAuth(async (obj: any, { id }: any, { Blog }: any) => {
      try {
        const data = await Blog.model(id);
        await Blog.deleteModel(id);
        return data;
      } catch (e) {
        return e;
      }
    }),
    addBlog: withAuth(async (obj: any, { input }: any, { identity, Blog }: any) => {
      try {
        if (!input.authorId) {
          input.authorId = identity.id;
        }
        const id = await Blog.addBlog(input);
        return Blog.blog(id);
      } catch (e) {
        return e;
      }
    }),
    editBlog: withAuth(async (obj: any, { input }: any, { Blog }: any) => {
      try {
        const inputId = input.id;
        delete input.id;
        await Blog.editBlog(inputId, input);
        return Blog.blog(inputId);
      } catch (e) {
        return e;
      }
    }),
    deleteBlog: withAuth(async (obj: any, { id }: any, { Blog }: any) => {
      try {
        const data = await Blog.blog(id);
        await Blog.deleteBlog(id);
        return data;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {}
});
