import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
import { ModelInput, BlogInput, Identifier, FilterInput } from './sql';

const MODEL_SUBSCRIPTION = 'model_subscription';
const BLOGS_SUBSCRIPTION = 'blogs_subscription';

interface AddModel {
  input: ModelInput;
}

interface EditModel {
  input: ModelInput & Identifier;
}

interface EditBlog {
  input: BlogInput & Identifier;
}

interface AddBlog {
  input: BlogInput;
}

interface BlogFilter {
  filter: FilterInput;
  limit: number;
  after: number;
}

export default (pubsub: PubSub) => ({
  Query: {
    async blogs(obj: any, { filter, limit, after }: BlogFilter, context: any) {
      const BlogOutput = await context.Blog.blogs(filter, limit, after);
      const { blogs, total } = BlogOutput;

      const hasNextPage = total > after + limit;

      const edgesArray: any = [];
      blogs.map((item: any, i: number) => {
        edgesArray.push({
          cursor: after + i,
          node: item
        });
      });

      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      
      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    },
    async userBlogs(obj: any, { id }: Identifier, { Blog, req: { identity } }: any) {
      return Blog.userBlogs(id || identity.id);
    },
    async blog(obj: any, { id }: Identifier, context: any) {
      return context.Blog.blog(id);
    },
    async models(obj: any, args: any, context: any) {
      return context.Model.models();
    },
    async model(obj: any, { id }: Identifier, context: any) {
      return context.Model.model(id);
    }
  },
  Mutation: {
    addModel: withAuth(async (obj: any, { input }: AddModel, { Model }: any) => {
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
    updateModel: withAuth(async (obj: any, { input }: EditModel, { Model }: any) => {
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
    deleteModel: withAuth(async (obj: any, { id }: Identifier, { Model }: any) => {
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
    addBlog: withAuth(async (obj: any, { input }: AddBlog, { auth, Blog }: any) => {
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
    editBlog: withAuth(async (obj: any, { input }: EditBlog, { Blog }: any) => {
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
    deleteBlog: withAuth(async (obj: any, { id }: Identifier, { Blog }: any) => {
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
          const { mutation, node } = payload.blogsUpdated;
          const {
            filter: { searchText, model, status }
          } = variables;
          const checkByFilter =
            (!model || model === node.model.name) &&
            (!status || status === node.status) &&
            (!searchText ||
              node.title.toUpperCase().includes(searchText.toUpperCase()) ||
              node.description.toUpperCase().includes(searchText.toUpperCase()) ||
              node.tags.some((item: any) => item.text.toUpperCase().includes(searchText.toUpperCase())));

          switch (mutation) {
            case 'UPDATED':
              return !checkByFilter;
            default:
              return;
          }
        }
      )
    }
  }
});
