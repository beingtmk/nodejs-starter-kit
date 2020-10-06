import update from 'immutability-helper';

import QUIZ_LIST_STATE_QUERY from '../graphql/QuizListStateQuery.client.graphql';

const TYPE_QUIZ_LIST_STATE = 'QuizListState';
const TYPE_QUIZ_LIST_STATE_FILTER = 'FilterQuizInput';

const defaults = {
  quizListState: {
    filter: {
      searchText: '',
      isPublic:false,
      __typename: TYPE_QUIZ_LIST_STATE_FILTER
    },
    __typename: TYPE_QUIZ_LIST_STATE
  }
};

const resolvers = {
  Mutation: {
    updateQuizListFilter: (_, { filter }, { cache }) => {
      const { quizListState } = cache.readQuery({
        query: QUIZ_LIST_STATE_QUERY
      });

      const newQuizListState = update(quizListState, {
        filter: { $merge: filter }
      });

      cache.writeData({
        data: {
          quizListState: newQuizListState,
          __type: TYPE_QUIZ_LIST_STATE
        }
      });

      return null;
    }
  }
};

export default {
  defaults,
  resolvers
};
