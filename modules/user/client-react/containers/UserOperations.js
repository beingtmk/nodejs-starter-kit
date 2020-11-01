import { graphql } from 'react-apollo';
import { PLATFORM, removeTypename, log } from '@gqlapp/core-common';
import update from 'immutability-helper';
import USERS_STATE_QUERY from '../graphql/UsersStateQuery.client.graphql';
import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';
import USERS_QUERY from '../graphql/UsersQuery.graphql';
import USER_LIST_QUERY from '../graphql/UserListQuery.graphql';
import DELETE_USER from '../graphql/DeleteUser.graphql';
import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';
import CURRENT_USER_QUERY from '../graphql/CurrentUserQuery.graphql';

import settings from '@gqlapp/config';

export const withCurrentUser = Component =>
  graphql(CURRENT_USER_QUERY, {
    props({ data: { loading, error, currentUser } }) {
      if (error) throw new Error(error);
      return { loading, currentUser };
    }
  })(Component);

const limit =
  PLATFORM === 'web' || PLATFORM === 'server'
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const withUsersState = Component =>
  graphql(USERS_STATE_QUERY, {
    props({ data: { usersState } }) {
      return removeTypename(usersState);
    }
  })(Component);

const withUsers = Component =>
  graphql(USERS_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { orderBy, filter }
      };
    },
    props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
      return {
        loading,
        users,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  })(Component);

const withUserList = Component =>
  graphql(USER_LIST_QUERY, {
    options: ({ orderBy, filter }) => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { limit: limit, after: 0, orderBy, filter },
        fetchPolicy: 'network-only'
      };
    },
    props: ({ data }) => {
      const { loading, error, userList, fetchMore, updateQuery, subscribeToMore } = data;
      const users = userList;
      // console.log("ops", users);
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.userList.totalCount;
            const newEdges = fetchMoreResult.userList.edges;
            const pageInfo = fetchMoreResult.userList.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.userList.edges, ...newEdges] : newEdges;

            return {
              userList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Profiles'
              }
            };
          }
        });
      };
      console.log('users ops', data);
      if (error) throw new Error(error);
      return { loading, users, loadData, updateQuery, subscribeToMore };
    }
  })(Component);

const withUsersDeleting = Component =>
  graphql(DELETE_USER, {
    props: ({ mutate }) => ({
      deleteUser: async id => {
        try {
          const {
            data: { deleteUser }
          } = await mutate({
            variables: { id }
          });

          if (deleteUser.errors) {
            return { errors: deleteUser.errors };
          }
        } catch (e) {
          log.error(e);
        }
      }
    })
  })(Component);

const withOrderByUpdating = Component =>
  graphql(UPDATE_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrderBy: orderBy => {
        mutate({ variables: { orderBy } });
      }
    })
  })(Component);

const withFilterUpdating = Component =>
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        console.log(searchText);
        mutate({ variables: { filter: { searchText } } });
      },
      onRoleChange(role) {
        mutate({ variables: { filter: { role } } });
      },
      onIsActiveChange(isActive) {
        mutate({ variables: { filter: { isActive } } });
      }
    })
  })(Component);

const updateUsersState = (usersUpdated, updateQuery) => {
  const { mutation, node } = usersUpdated;
  updateQuery(prev => {
    switch (mutation) {
      case 'CREATED':
        return addUser(prev, node);
      case 'DELETED':
        return deleteUser(prev, node.id);
      case 'UPDATED':
        return deleteUser(prev, node.id);
      default:
        return prev;
    }
  });
};

function addUser(prev, node) {
  // check if it is duplicate
  if (prev.users.some(user => user.id === node.id)) {
    return prev;
  }

  return update(prev, {
    users: {
      $set: [...prev.users, node]
    }
  });
}

function deleteUser(prev, id) {
  const index = prev.users.findIndex(user => user.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    users: {
      $splice: [[index, 1]]
    }
  });
}

export { withUsersState, withUsers, withUsersDeleting, withOrderByUpdating, withFilterUpdating, withUserList };
export { updateUsersState };
