import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';

const MODEL_SUBSCRIPTION = 'model_subscription';
const BLOGS_SUBSCRIPTION = 'blogs_subscription';

export default (pubsub: PubSub) => ({
  Query: {
    async blogs(obj: any, args: any, context: any) {
      return context.Blog.blogs();
    },
    async userBlogs(obj: any, { id }: any, { Blog, req: { identity } }: any) {
      return Blog.userBlogs(id || identity.id);
    },
    async blog(obj: any, { id }: any, context: any) {
      return context.Blog.blog(id);
    },
    async models(obj: any, args: any, context: any) {
      return context.Model.models();
    },
    async model(obj: any, { id }: any, context: any) {
      return context.Model.model(id);
    }
  },
  Mutation: {
    addModel: withAuth(async (obj: any, { input }: any, { Model }: any) => {
      try {
        const id = await Model.addModel(input);
        const item = await Model.model(id);
        pubsub.publish(MODEL_SUBSCRIPTION, {
          modelUpdated: {
            mutation: 'CREATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    updateModel: withAuth(async (obj: any, { input }: any, { Model }: any) => {
      try {
        const inputId = input.id;
        delete input.id;
        await Model.updateModel(inputId, input);
        const item = await Model.model(inputId);
        pubsub.publish(MODEL_SUBSCRIPTION, {
          modelUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteModel: withAuth(async (obj: any, { id }: any, { Model }: any) => {
      try {
        const data = await Model.model(id);
        await Model.deleteModel(id);
        pubsub.publish(MODEL_SUBSCRIPTION, {
          modelUpdated: {
            mutation: 'DELETED',
            node: data
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    }),
    addBlog: withAuth(async (obj: any, { input }: any, { auth, Blog }: any) => {
      try {
        if (!input.authorId) {
          input.authorId = auth.isAuthenticated.id;
        }
        const id = await Blog.addBlog(input);
        const item = await Blog.blog(id);
        pubsub.publish(BLOGS_SUBSCRIPTION, {
          blogsUpdated: {
            mutation: 'CREATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    editBlog: withAuth(async (obj: any, { input }: any, { Blog }: any) => {
      try {
        const inputId = await Blog.editBlog(input);
        const item = await Blog.blog(inputId);
        pubsub.publish(BLOGS_SUBSCRIPTION, {
          blogsUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteBlog: withAuth(async (obj: any, { id }: any, { Blog }: any) => {
      try {
        const data = await Blog.blog(id);
        await Blog.deleteBlog(id);
        pubsub.publish(BLOGS_SUBSCRIPTION, {
          blogsUpdated: {
            mutation: 'DELETED',
            node: data
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    modelUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MODEL_SUBSCRIPTION),
        (payload, variables) => {
          return payload.modelUpdated.id === variables.id;
        }
      )
    },
    blogsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(BLOGS_SUBSCRIPTION),
        (payload, variables) => {
          return payload.blogsUpdated.id === variables.id;
        }
      )
    }
  }
});
