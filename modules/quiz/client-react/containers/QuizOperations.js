import { graphql } from 'react-apollo';
import update from 'immutability-helper';
import { removeTypename, log } from '@gqlapp/core-common';
// import USERS_STATE_QUERY from '../graphql/UsersStateQuery.client.graphql';
// import UPDATE_ORDER_BY from '../graphql/UpdateOrderBy.client.graphql';
// import USERS_QUERY from '../graphql/UsersQuery.graphql';
// import DELETE_USER from '../graphql/DeleteUser.graphql';
// import UPDATE_FILTER from '../graphql/UpdateFilter.client.graphql';

// const withUsersState = Component =>
//   graphql(USERS_STATE_QUERY, {
//     props({ data: { usersState } }) {
//       return removeTypename(usersState);
//     }
//   })(Component);

// const withUsers = Component =>
//   graphql(USERS_QUERY, {
//     options: ({ orderBy, filter }) => {
//       return {
//         fetchPolicy: 'network-only',
//         variables: { orderBy, filter }
//       };
//     },
//     props({ data: { loading, users, refetch, error, updateQuery, subscribeToMore } }) {
//       return { loading, users, refetch, subscribeToMore, updateQuery, errors: error ? error.graphQLErrors : null };
//     }
//   })(Component);

// const withUsersDeleting = Component =>
//   graphql(DELETE_USER, {
//     props: ({ mutate }) => ({
//       deleteUser: async id => {
//         try {
//           const {
//             data: { deleteUser }
//           } = await mutate({
//             variables: { id }
//           });

//           if (deleteUser.errors) {
//             return { errors: deleteUser.errors };
//           }
//         } catch (e) {
//           log.error(e);
//         }
//       }
//     })
//   })(Component);

// const withOrderByUpdating = Component =>
//   graphql(UPDATE_ORDER_BY, {
//     props: ({ mutate }) => ({
//       onOrderBy: orderBy => {
//         mutate({ variables: { orderBy } });
//       }
//     })
//   })(Component);

// const withFilterUpdating = Component =>
//   graphql(UPDATE_FILTER, {
//     props: ({ mutate }) => ({
//       onSearchTextChange(searchText) {
//         mutate({ variables: { filter: { searchText } } });
//       },
//       onRoleChange(role) {
//         mutate({ variables: { filter: { role } } });
//       },
//       onIsActiveChange(isActive) {
//         mutate({ variables: { filter: { isActive } } });
//       }
//     })
//   })(Component);

const updateQuizzesState = (quizzesUpdated, updateQuery) => {
  console.log('quiz updated')
  const { mutation, node } = quizzesUpdated;
  updateQuery(prev => {
    console.log('prev update', prev);
    switch (mutation) {
      case 'CREATED':
        console.log('quiz created')
        return addQuiz(prev, node);

      case 'DELETED':
        console.log('quiz deleted')

        return deleteQuiz(prev, node.id);
      case 'UPDATED':
        return deleteQuiz(prev, node.id);
      default:
        return prev;
    }
  });
};

function addQuiz(prev, node) {
  // check if it is duplicate
  if (prev.quizzes.some(quiz => quiz.id === node.id)) {
    return prev;
  }
  console.log('add quiz', prev, node);
  return update(prev, {
    quizzes: {
      $set: [...prev.quizzes, node]
    }
  });
}

function deleteQuiz(prev, id) {
  console.log('prevv', prev)
  const index = prev.quizzes.findIndex(quiz => quiz.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    quizzes: {
      $splice: [[index, 1]]
    }
  });
}

// export { withUsersState, withUsers, withUsersDeleting, withOrderByUpdating, withFilterUpdating };
export { updateQuizzesState };
