import { graphql } from "react-apollo";
import { PLATFORM, removeTypename, log } from "@gqlapp/core-common";
import update from "immutability-helper";
import { message } from "antd";

// import LISTINGS_QUERY from '../graphql/ListingsQuery.graphql';
import FAQS_QUERY from "../graphql/FaqsQuery.graphql";
import UPDATE_FILTER from "../graphql/UpdateFaqFilter.client.graphql";
import FAQ_STATE_QUERY from "../graphql/FaqStateQuery.client.graphql";
import UPDATE_ORDER_BY from "../graphql/UpdateOrderBy.client.graphql";

import settings from "../../../../settings";

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

const withFaqState = (Component) =>
  graphql(FAQ_STATE_QUERY, {
    props({ data }) {
      return removeTypename(data.faqState);
    },
  })(Component);

const withFeaturedFaqList = (Component) =>
  graphql(FAQS_QUERY, {
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
      const { loading, error, faqs } = data;
      // console.log("ops", profiles);
      if (error) throw new Error(error);
      return { loading, faqs };
    },
  })(Component);

const withAdminCardFaqList = (Component) =>
  graphql(FAQS_QUERY, {
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
        faqs,
        fetchMore,
        updateQuery,
        subscribeToMore,
      } = data;
      // console.log("ops", profiles);
      const loadDataFaqs = async (after, dataDelivery) => {
        return await fetchMore({
          variables: {
            after: after,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.faqs.totalCount;
            const newEdges = fetchMoreResult.faqs.edges;
            const pageInfo = fetchMoreResult.faqs.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.faqs.edges, ...newEdges]
                : newEdges;
            return {
              faqs: {
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
        faqs,
        loadDataFaqs,
        updateQuery,
        subscribeToMore,
      };
    },
  })(Component);

const withCardFaqList = (Component) =>
  graphql(FAQS_QUERY, {
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
        faqs,
        fetchMore,
        updateQuery,
        subscribeToMore,
      } = data;
      // console.log("ops", profiles);
      const loadDataFaqs = async (after, dataDelivery) => {
        return await fetchMore({
          variables: {
            after: after,
          },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.faqs.totalCount;
            const newEdges = fetchMoreResult.faqs.edges;
            const pageInfo = fetchMoreResult.faqs.pageInfo;
            const displayedEdges =
              dataDelivery === "add"
                ? [...previousResult.faqs.edges, ...newEdges]
                : newEdges;
            return {
              faqs: {
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
        faqs,
        loadDataFaqs,
        updateQuery,
        subscribeToMore,
      };
    },
  })(Component);

const withFilterUpdating = (Component) =>
  graphql(UPDATE_FILTER, {
    props: ({ mutate }) => ({
      onSearchTextChange(searchText) {
        mutate({ variables: { filter: { searchText } } });
      },
      onIsFeaturedChange(isFeatured) {
        mutate({ variables: { filter: { isFeatured } } });
      },
    }),
  })(Component);

const withOrderByUpdating = (Component) =>
  graphql(UPDATE_ORDER_BY, {
    props: ({ mutate }) => ({
      onOrderBy: (orderBy) => {
        mutate({ variables: { orderBy } });
      },
    }),
  })(Component);


const updateFaqsState = (faqsUpdated, updateQuery) => {
  const { mutation, node } = faqsUpdated;
  updateQuery((prev) => {
    switch (mutation) {
      case "CREATED":
        return addFaq(prev, node);
      case "DELETED":
        return deleteFaq(prev, node.id);
      case "UPDATED":
        return updateFaq(prev, node);
      default:
        return prev;
    }
  });
};

function addFaq(prev, node) {
  // check if it is duplicate
  if (prev.faqs.edges.some((x) => x.node.id === node.id)) {
    return prev;
  }
  return update(prev, {
    faqs: {
      $set: [...prev.faqs.edges, node],
    },
  });
}

function updateFaq(prev, node) {
  // check if it is duplicate
  if (prev.faqs.edges.some((x) => x.node.id === node.id)) {
    return prev;
  }
  var data = prev;
  const index = prev.faqs.edges.indexOf((x) => x.node.id === node.id);
  data.faqs.edges[index] = node;
  return update(prev, {
    faqs: {
      $set: [...data.faqs.edges],
    },
  });
}

function deleteFaq(prev, id) {
  const index = prev.faqs.edges.findIndex((x) => x.node.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    faqs: {
      totalCount: {
        $set: prev.faqs.totalCount - 1,
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
  withFaqState,
  withCardFaqList,
  withAdminCardFaqList,
  withFeaturedFaqList,
  withFilterUpdating,
  updateFaqsState,
  withOrderByUpdating,
};
// export { updateListingsState };
