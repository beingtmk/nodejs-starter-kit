import React, { useEffect } from "react";
import { message } from "antd";
import { compose, removeTypename } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";

import FaqsListView from "../components/FaqsListView";
import DELETE_FAQ from "../graphql/DeleteFaq.graphql";
import TOGGLE_FEATURED_FAQ from "../graphql/ToggleFeaturedFaq.graphql";
import {
  withAdminCardFaqList,
  withFaqState,
  withFilterUpdating,
  updateFaqsState,
  withOrderByUpdating,
} from "./FaqOperations";
import { useFaqWithSubscription } from "./withSubscription";

const FaqsAdminPanel = (props) => {
  const { t, updateQuery, subscribeToMore } = props;
  const filter = {};
  const faqsUpdated = useFaqWithSubscription(subscribeToMore, filter);

  useEffect(() => {
    if (faqsUpdated) {
      updateFaqsState(faqsUpdated, updateQuery);
    }
  });
  return <FaqsListView {...props} />;
};

// return <h1>Faqs</h1>;
FaqsAdminPanel.propTypes = {
  loading: PropTypes.bool.isRequired,
  faqs: PropTypes.object,
  subscribeToMore: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

export default compose(
  withFaqState,
  withAdminCardFaqList,
  withFilterUpdating,
  withOrderByUpdating,
  graphql(TOGGLE_FEATURED_FAQ, {
    props: ({ mutate }) => ({
      toggleFeatured: async (id) => {
        const { data: faq } = await mutate({
          variables: { id },
        });
        return faq;
      },
    }),
  }),
  graphql(DELETE_FAQ, {
    props: ({ mutate }) => ({
      deleteFaq: (id) => {
        mutate({
          variables: { id },
          optimisticResponse: {
            __typename: "Mutation",
            deleteFaq: {
              id,
              __typename: "Faq",
            },
          },
        });
        message.warning("Faq deleted.");
      },
    }),
  })
)(FaqsAdminPanel);
