import { graphql } from "react-apollo";
import { PLATFORM, removeTypename, log } from "@gqlapp/core-common";
import update from "immutability-helper";
import { message } from "antd";

// import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import QUIZ_LIST_QUERY from "../graphql/QuizListQuery.graphql";
import UPDATE_QUIZ_LIST_FILTER from "../graphql/UpdateQuizListFilter.client.graphql";
import QUIZ_LIST_STATE_QUERY from "../graphql/QuizListStateQuery.client.graphql";
// import UPDATE_ORDER_BY from "../graphql/UpdateOrderBy.client.graphql";

import settings from "../../../../settings";

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const withQuizListState = (Component) =>
  graphql(QUIZ_LIST_STATE_QUERY, {
    props({ data }) {
      const quizListState = removeTypename(data.quizListState);
      return {...quizListState, stateLoading:data.loading };
    },
  })(Component);

const withFeaturedQuizList = (Component) =>
  graphql(QUIZ_LIST_QUERY, {
    options: () => {
      return {
        // eslint-disable-next-line prettier/prettier
        variables: {
          limit: 10,
          filter: {isFeatured: "true" },
        },
        fetchPolicy: "network-only",
      };
    },
    props: ({ data }) => {
      const { loading, error, quizList } = data;
      // console.log("ops", profiles);
      if (error) throw new Error(error);
      return { loading, quizList };
    },
  })(Component);

const withAdminCardQuizList = (Component) =>
  graphql(QUIZ_LIST_QUERY, {
    options: ({ orderBy, filter }) => {
      const filterss = filter;
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { filter: filterss, after: 0, limit: limit,  orderBy },
        fetchPolicy: "network-only",
      };
    },
    props: ({ data }) => {
      const {
        loading,
        error,
        quizList,
        fetchMore,
        updateQuery,
        subscribeToMore,
      } = data;
      // console.log("ops", profiles);
      const loadDataQuizList = async (after, dataDelivery) => {
        return await fetchMore({
          variables: {
            after: after,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.quizList.totalCount;
            const newEdges = fetchMoreResult.quizList.edges;
            const pageInfo = fetchMoreResult.quizList.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.quizList.edges, ...newEdges]
                : newEdges;
            return {
              quizList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: "Profiles",
              },
            };
          },
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        quizList,
        loadDataQuizList,
        updateQuery,
        subscribeToMore,
      };
    },
  })(Component);

const withCardQuizList = (Component) =>
  graphql(QUIZ_LIST_QUERY, {
    options: ({ orderBy, filter }) => {

      // filter.today = true;
      return {
        // eslint-disable-next-line prettier/prettier
        variables: { filter, limit, after: 0, orderBy },
        fetchPolicy: "network-only",
      };
    },
    props: ({ data }) => {
      const {
        loading,
        error,
        quizList,
        fetchMore,
        updateQuery,
        subscribeToMore,
      } = data;
      // console.log("ops", profiles);
      const loadDataQuizList = async (after, dataDelivery) => {
        return await fetchMore({
          variables: {
            after: after,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.quizList.totalCount;
            const newEdges = fetchMoreResult.quizList.edges;
            const pageInfo = fetchMoreResult.quizList.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.quizList.edges, ...newEdges]
                : newEdges;
            return {
              quizList: {
                // By returning `cursor` here, we update the `fetchMore` function
                // to the new cursor.

                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: "Profiles",
              },
            };
          },
        });
      };
      if (error) throw new Error(error);
      return {
        loading,
        quizList,
        loadDataQuizList,
        updateQuery,
        subscribeToMore,
      };
    },
  })(Component);

const withFilterUpdating = (Component) =>
  graphql(UPDATE_QUIZ_LIST_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onIsPublicChange(isPublic) {
        mutate({ variables: { filter: { isPublic } } });
      },
    }),
  })(Component);

// const withOrderByUpdating = (Component) =>
//   graphql(UPDATE_ORDER_BY, {
//     props: ({ mutate }) => ({
//       onOrderBy: (orderBy) => {
//         mutate({ variables: { orderBy } });
//       },
//     }),
//   })(Component);


const updateQuizListState = (quizListUpdated, updateQuery) => {
  const { mutation, node } = quizListUpdated;
  console.log('updatedFaqsState', mutation, node);
  updateQuery((prev) => {
    switch (mutation) {
      case "CREATED":
        return addQuizItem(prev, node);
      case "DELETED":
        return deleteQuizItem(prev, node.id);
      case "UPDATED":
        return updateQuizItem(prev, node);
      default:
        return prev;
    }
  });
};

function addQuizItem(prev, node) {
  // check if it is duplicate
  if (prev.quizList.edges.some((x) => x.node.id === node.id)) {
    return prev;
  }
  return update(prev, {
    quizList: {
      $set: [...prev.quizList.edges, node],
    },
  });
}

function updateQuizItem(prev, node) {
  // check if it is duplicate
  if (prev.quizList.edges.some((x) => x.node.id === node.id)) {
    return prev;
  }
  var data = prev;
  const index = prev.quizList.edges.indexOf((x) => x.node.id === node.id);
  data.quizList.edges[index] = node;
  return update(prev, {
    quizList: {
      $set: [...data.quizList.edges],
    },
  });
}

function deleteQuizItem(prev, id) {
  const index = prev.quizList.edges.findIndex((x) => x.node.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    quizList: {
      totalCount: {
        $set: prev.quizList.totalCount - 1,
      },
      edges: {
        $splice: [[index, 1]],
      },
    },
  });
}

// const onUpdateProfile = (prev, id) => {
//   const index = prev.profiles.edges.findIndex((x) => x.node.id === id);

//   // ignore if not found
//   if (index < 0) {
//     return prev;
//   }

//   return update(prev, {
//     faqs: {
//       totalCount: {
//         $set: prev.profiles.totalCount - 1,
//       },
//       edges: {
//         $splice: [[index, 1]],
//       },
//     },
//   });
// };

export {
  withQuizListState,
  withCardQuizList,
  withAdminCardQuizList,
  withFeaturedQuizList,
  withFilterUpdating,
  updateQuizListState,
  // withOrderByUpdating,
};
// export { updateListingsState };
