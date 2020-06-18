import React from "react";
// import { Mutation, FetchResult, MutationFn } from 'react-apollo';
import { FormError } from "@gqlapp/forms-client-react";
import { translate, TranslateFunction } from "@gqlapp/i18n-client-react";
// import PersonalQuizResultView from '../components/PersonalQuizResultView';
import { graphql } from "react-apollo";
import { compose } from "@gqlapp/core-common";
import { message, Modal, Button, Spin as Loader } from "antd";
import { Form, FormItem, Select, Option, Label, Input } from '@gqlapp/look-client-react';
import GROUP_QUERY from '@gqlapp/group-client-react/graphql/GroupsQuery.graphql';

import USER_WISE_RESULT_QUERY from "../graphql/UserWiseResultQuery.graphql";

//To Do - Query after state.visible is true
const QuizUserWiseReport = (props) => {
  const QuizUserWiseReportComponent = props.QuizUserWiseReportComponent;
  console.log('groupsss', props.groupId,  props.quiz && props.quiz.attendees);

  const setGroupId = (e) => {
    props.setGroupId(e);
    console.log('refetch comencing');
  }
  props.refetchResult()

  return (
    <>
      {!props.groupLoading && props.groups && props.groups.edges && props.groups.edges.length !== 0 && (<Form layout="inline">
        <FormItem label='Select by group'>
        <Select  name="group" defaultValue={props.groupId || 'All'} style={{ width: '100px' }} onChange={setGroupId}>
          <Option key={1} value={null}>
            All
          </Option>
          {props.groups.edges.map((edge) => (
            <Option key={1} value={edge.node && edge.node.id}>
              {edge.node.title}
            </Option>
          ))}
        </Select>
        </FormItem>
      </Form>)}
      {props.quizzLoading && !props.quiz ? (
        <div align="center">
          <Loader />
        </div>
      ) : (
          <>
            <QuizUserWiseReportComponent quiz={props.quiz} />
          </>
        )}
    </>
  );
};

export default compose(
  graphql(USER_WISE_RESULT_QUERY, {
    options: (props) => {
      return {
        variables: { id: Number(props.quizId), groupId: Number(props.groupId) },
      };
    },
    props({ data: { loading, error, getUserWiseResult, refetch } }) {
      if (error) throw new Error(error);
      return { quizzLoading: loading, quiz: getUserWiseResult, refetchResult:refetch };
    },
  }),
  graphql(GROUP_QUERY, {
    options: ({ filter }) => {
      return {
        fetchPolicy: 'network-only',
        variables: { limit: 100, after: 0, filter }
      };
    },
    props({ data }) {
      const { loading, error, groups, fetchMore, updateQuery, subscribeToMore, refetch } = data;
      const allGroups = groups;
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: { after },

          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.groups.totalCount;
            const newEdges = fetchMoreResult.groups.edges;
            const pageInfo = fetchMoreResult.groups.pageInfo;
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.groups.edges, ...newEdges] : newEdges;

            return {
              groups: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Groups'
              }
            };
          }
        });
      };
      return {
        groupLoading: loading,
        groups: allGroups,
        loadData,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null
      };
    }
  }),
)(translate("quiz")(QuizUserWiseReport));
