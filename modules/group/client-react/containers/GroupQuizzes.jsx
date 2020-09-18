import React from "react";
import PropTypes from "prop-types";
import { compose, removeTypename, PLATFORM } from "@gqlapp/core-common";
import { graphql } from "react-apollo";
import update from "immutability-helper";
import { translate } from "@gqlapp/i18n-client-react";
import {NavLink} from 'react-router-dom';
import { message, Tabs, Typography, Spin as Loader, Button } from "antd";

import settings from "@gqlapp/config";
import GROUP_SUBSCRIPTION from "../graphql/GroupsSubscription.graphql";
import GROUP_QUIZZES_QUERY from "../graphql/GroupQuizzesQuery.graphql";
import DELETE_QUIZ_GROUP from "../graphql/DeleteQuizFromGroup.graphql";
import ADD_QUIZ_TO_GROUP from "../graphql/AddQuizToGroup.graphql";
import UPDATE_FILTER from "../graphql/UpdateGroupFilter.client.graphql";
import GROUP_STATE_QUERY from "../graphql/GroupStateQuery.client.graphql";
import GroupQuizzesView from "../components/GroupQuizzesView";
import AddPublicQuizToGroup from "@gqlapp/quiz-client-react/containers/AddPublicQuizToGroup.web";
import QuizImportFromParentGroup from "./QuizImportFromParentGroup";


const { TabPane } = Tabs;
const { Title, Text, Paragraph } = Typography;

const limit =
  PLATFORM === "web" || PLATFORM === "server"
    ? settings.pagination.web.itemsNumber
    : settings.pagination.mobile.itemsNumber;

class GroupQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  // componentDidUpdate(prevProps) {
  //   if (!this.props.groupLoading) {
  //     const endCursor = this.props.groups
  //       ? this.props.groups.pageInfo.endCursor
  //       : 0;
  //     var groupId;
  //     if (this.props.match) {
  //       groupId = this.props.match.params.id;
  //     } else if (this.props.navigation) {
  //       groupId = this.props.navigation.state.params.id;
  //     }
  //     const prevEndCursor = prevProps.groups
  //       ? prevProps.groups.pageInfo.endCursor
  //       : null;
  //     // Check if props have changed and, if necessary, stop the subscription
  //     if (this.subscription && prevEndCursor !== endCursor) {
  //       this.subscription();
  //       this.subscription = null;
  //     }
  //     if (!this.subscription) {
  //       this.subscribeToGroups(endCursor, Number(groupId));
  //     }
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.subscription) {
  //     // unsubscribe
  //     this.subscription();
  //     this.subscription = null;
  //   }
  // }

  // subscribeToGroups = (endCursor, groupId) => {
  //   const { subscribeToMore, filter } = this.props;
  //   subscribeToMore({
  //     document: GROUP_SUBSCRIPTION,
  //     variables: { endCursor, filter, parentGroupId: groupId },
  //     updateQuery: (
  //       prev,
  //       {
  //         subscriptionData: {
  //           data: {
  //             groupsUpdated: { mutation, node, parentGroupId },
  //           },
  //         },
  //       }
  //     ) => {
  //       let newResult = prev;
  //       if (mutation === "CREATED") {
  //         newResult = onAddGroup(prev, node);
  //       } else if (mutation === "UPDATED") {
  //         newResult = onDelete(prev, node.id);
  //         return () => newResult();
  //       } else if (mutation === "DELETED") {
  //         newResult = onDelete(prev, node.id);
  //       }
  //       return newResult;
  //     },
  //   });
  // };

  render() {
    console.log("groupQuizzesContainer", this.props);
    const {
      addQuizToGroup,
      group,
      groupQuizzes,
      groupQuizzesLoading,
    } = this.props;
    return (
      <>
        {!groupQuizzesLoading ? (
          <Tabs defaultActiveKey="1"
            tabBarExtraContent={[
              <NavLink to={`/quiz-add/${group && group.id}`}><Button type='primary'>Add Quiz</Button></NavLink>
            ]}
          >
            <TabPane tab={"Group Quizzes"} key="1">
              <GroupQuizzesView {...this.props} />
            </TabPane>
            <TabPane tab={"Add From Public"} key="2">
              <AddPublicQuizToGroup {...this.props} />
            </TabPane>
            {group && group.groupId && (
              <TabPane tab={"Import From Parent Group"} key="3">
                <QuizImportFromParentGroup
                  childGroup={group}
                  childGroupQuizzes={groupQuizzes}
                  addQuizToGroup={addQuizToGroup}
                />
              </TabPane>
            )}
          </Tabs>
        ) : (
          <div align="center">
            <Loader />
          </div>
        )}
      </>
    );
  }
}

GroupQuizzes.propTypes = {
  subscribeToMore: PropTypes.func,
  filter: PropTypes.object,
  groupLoading: PropTypes.bool,
  groups: PropTypes.object,
};

// const onAddGroup = (prev, node) => {
//   // ignore if duplicate

//   if (prev.groups.edges.some((post) => node.id === post.cursor)) {
//     return update(prev, {
//       groups: {
//         totalCount: {
//           $set: prev.groups.totalCount - 1,
//         },
//         edges: {
//           $set: prev.groups.edges,
//         },
//       },
//     });
//   }

//   const filteredPosts = prev.groups.edges.filter(
//     (post) => post.node.id !== null
//   );

//   const edge = {
//     cursor: node.id,
//     node: node,
//     __typename: "GroupEdges",
//   };

//   return update(prev, {
//     groups: {
//       totalCount: {
//         $set: prev.groups.totalCount + 1,
//       },
//       edges: {
//         $set: [edge, ...filteredPosts],
//       },
//     },
//   });
// };

// const onDelete = (prev, id) => {
//   const index = prev.groups.edges.findIndex((item) => item.node.id === id);

//   // ignore if not found
//   if (index < 0) {
//     return prev;
//   }

//   return update(prev, {
//     groups: {
//       totalCount: {
//         $set: prev.groups.totalCount - 1,
//       },
//       edges: {
//         $splice: [[index, 1]],
//       },
//     },
//   });
// };

export default compose(
  // graphql(GROUP_STATE_QUERY, {
  //   props({ data: { groupState } }) {
  //     return removeTypename(groupState);
  //   },
  // }),
  // graphql(UPDATE_FILTER, {
  //   props: ({ mutate }) => ({
  //     onSearchTextChange(searchText) {
  //       mutate({ variables: { filter: { searchText } } });
  //     },
  //   }),
  // }),
  graphql(GROUP_QUIZZES_QUERY, {
    options: ({ groupId }) => {
      return {
        fetchPolicy: "network-only",
        variables: { groupId: Number(groupId) },
      };
    },
    props({ data }) {
      console.log("groupQuizzesQuerydata", data);
      const {
        groupQuizzesLoading,
        error,
        groupQuizzes,
        fetchMore,
        updateQuery,
        subscribeToMore,
        refetch,
      } = data;
      // const allGroups = groups;
      // const loadData = (after, dataDelivery) => {
      //   return fetchMore({
      //     variables: { after },

      //     updateQuery: (previousResult, { fetchMoreResult }) => {
      //       const totalCount = fetchMoreResult.groups.totalCount;
      //       const newEdges = fetchMoreResult.groups.edges;
      //       const pageInfo = fetchMoreResult.groups.pageInfo;
      //       const displayedEdges =
      //         dataDelivery === "add"
      //           ? [...previousResult.groups.edges, ...newEdges]
      //           : newEdges;

      //       return {
      //         groups: {
      //           totalCount,
      //           edges: displayedEdges,
      //           pageInfo,
      //           __typename: "Groups",
      //         },
      //       };
      //     },
      //   });
      // };
      return {
        groupQuizzes,
        groupQuizzesLoading,
        // loadData,
        refetch,
        subscribeToMore,
        updateQuery,
        errors: error ? error.graphQLErrors : null,
      };
    },
  }),
  graphql(ADD_QUIZ_TO_GROUP, {
    props: ({ mutate }) => ({
      addQuizToGroup: async (input) => {
        message.loading("Please wait...", 0);
        console.log(input);
        try {
          const {
            data: { addQuizToGroup },
          } = await mutate({ variables: { input } });

          if (addQuizToGroup.errors) {
            return { errors: addQuizToGroup.errors };
          }
          message.destroy();
          message.success("Added Quiz To Group!");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  }),
  graphql(DELETE_QUIZ_GROUP, {
    props: ({ mutate }) => ({
      deleteQuizFromGroup: async (quizGroupId) => {
        message.loading("Please wait...", 0);
        try {
          const {
            data: { deleteQuizFromGroup },
          } = await mutate({ variables: { quizGroupId } });

          if (deleteQuizFromGroup.errors) {
            return { errors: deleteQuizFromGroup.errors };
          }
          message.destroy();
          message.success("Deleted Quiz From Group!");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })
)(translate("group")(GroupQuizzes));
