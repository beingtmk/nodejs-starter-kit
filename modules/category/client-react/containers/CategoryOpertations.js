import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename } from '@gqlapp/core-common';
import { Message } from '@gqlapp/look-client-react';

import settings from '@gqlapp/config';

// Query
import CATEGORY_QUERY from '../graphql/CategoryQuery.graphql';
import CATEGORIES_QUERY from '../graphql/CategoriesQuery.graphql';
import CATEGORIES_STATE_QUERY from '../graphql/CategoriesStateQuery.client.graphql';

// Mutation
import ADD_CATEGORY from '../graphql/AddCategory.graphql';
import EDIT_CATEGORY from '../graphql/EditCategory.graphql';
import DELETE_CATEGORY from '../graphql/DeleteCategory.graphql';

// Filter
import UPDATE_ORDER_BY_CATEGORIES from '../graphql/UpdateOrderByCategories.client.graphql';
import UPDATE_CATEGORIES_FILTER from '../graphql/UpdateCategoriesFilter.client.graphql';

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

// Query
export const withCategoriesState = Component =>
  graphql(CATEGORIES_STATE_QUERY, {
    props({ data: { categoriesState, loading } }) {
      return { ...removeTypename(categoriesState), loadingState: loading };
    }
  })(Component);

export const withCategories = Component =>
  graphql(CATEGORIES_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, categories, fetchMore, subscribeToMore, updateQuery } = data;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.categories.totalCount;
            const newEdges = fetchMoreResult.categories.edges;
            const pageInfo = fetchMoreResult.categories.pageInfo;
            const displayedEdges =
              dataDelivery === 'add' ? [...previousResult.categories.edges, ...newEdges] : newEdges;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              categories: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Categories'
              }
            };
          }
        });
      };
      if (error) throw new Error(error);
      return { loading, categories, subscribeToMore, loadData, updateQuery };
    }
  })(Component);

export const withCategory = Component =>
  graphql(CATEGORY_QUERY, {
    options: props => {
      let id = 0;
      if (props.match) {
        id = props.match.params.cid;
      } else if (props.navigation) {
        id = props.navigation.state.params.cid;
      }
      console.log(props.modalId);
      return {
        variables: { id: Number(id) || props.modalId }
      };
    },
    props({ data: { loading, error, category, subscribeToMore, updateQuery } }) {
      if (error) throw new Error(error);
      return { loading, category, subscribeToMore, updateQuery };
    }
  })(Component);

// Mutation
export const withAddCategory = Component =>
  graphql(ADD_CATEGORY, {
    props: ({ mutate }) => ({
      addCategory: async values => {
        try {
          await mutate({
            variables: {
              input: values
            },
            optimisticResponse: {
              __typename: 'Mutation',
              addCategory: {
                __typename: 'Category',
                ...values
              }
            }
          });
          return true;
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

export const withCategoryDeleting = Component =>
  graphql(DELETE_CATEGORY, {
    props: ({ mutate }) => ({
      deleteCategory: id => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteCategory: {
              id: id,
              __typename: 'Category'
            }
          }
        });
        Message.warning('Category deleted.');
      }
    })
  })(Component);

export const withEditCategory = Component =>
  graphql(EDIT_CATEGORY, {
    props: ({ mutate }) => ({
      editCategory: async input => {
        try {
          await mutate({
            variables: {
              input: input
            }
          });
        } catch (e) {
          Message.destroy();
          Message.error("Couldn't perform the action");
          console.error(e);
        }
      }
    })
  })(Component);

// Filter
export const withFilterUpdating = Component =>
  graphql(UPDATE_CATEGORIES_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        // console.log("searchtext", searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      },
      onModalNameChange(modalName) {
        mutate({ variables: { filter: { modalName } } });
      },
      onFiltersRemove(filter, orderBy) {
        mutate({
          variables: {
            filter,
            orderBy
          }
        });
      }
    })
  })(Component);

export const withOrderByUpdating = Component =>
  graphql(UPDATE_ORDER_BY_CATEGORIES, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        // console.log('orderby', mutate);
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);
