import { graphql } from "react-apollo";
import update from "immutability-helper";
import { message } from "antd";
import { removeTypename, log } from "@gqlapp/core-common";
import QUIZ_EDIT from "../graphql/QuizEdit.graphql";
import ADD_QUIZ_QUERY from "../graphql/AddQuizQuery.graphql";
import DELETE_SECTION from "../graphql/DeleteSection.graphql";
import DELETE_QUESTION from "../graphql/DeleteQuestion.graphql";
import ADD_SECTION from "../graphql/AddSection.graphql";
import SUBMIT_QUESTION from "../graphql/SubmitQuestion.graphql";
import SUBMIT_SECTION from "../graphql/SubmitSection.graphql";

// const withUsersState = Component =>
//   graphql(USERS_STATE_QUERY, {
//     props({ data: { usersState } }) {
//       return removeTypename(usersState);
//     }
//   })(Component);

const withAddQuizQuery = (Component) =>
  graphql(ADD_QUIZ_QUERY, {
    options: (props) => {
      const currentUserId =
        !props.currentUserLoading && props.currentUser && props.currentUser.id;

      return {
        variables: { userId: Number(currentUserId) },
      };
    },
    props({
      data: {
        loading,
        error,
        addQuizQuery,
        refetch,
        updateQuery,
        subscribeToMore,
      },
    }) {
      if (error) throw new Error(error);
      return {
        quizLoading: loading,
        quiz: addQuizQuery,
        refetch,
        updateQuery,
        subscribeToMore,
      };
    },
  })(Component);

const withQuizEditing = (Component) =>
  graphql(QUIZ_EDIT, {
    props: ({ ownProps: { history, navigation, refetch }, mutate }) => ({
      editQuiz: async (values) => {
        message.destroy();
        message.loading("Please wait...", 0);
        try {
          let quizData = await mutate({
            variables: {
              input: values,
            },
            optimisticResponse: {
              __typename: "Mutation",
              editQuiz: {
                __typename: "Quiz",
                ...values,
              },
            },
          });
          refetch();
          message.destroy();
          message.success("Quiz edited.");
        } catch (e) {
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

const withSectionDeleting = (Component) =>
  graphql(DELETE_SECTION, {
    props: ({ mutate }) => ({
      deleteSection: async (id) => {
        try {
          const {
            data: { deleteSection },
          } = await mutate({
            variables: { id },
          });
          message.destroy();
          message.success("Section deleted.");
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

const withQuestionDeleting = (Component) =>
  graphql(DELETE_QUESTION, {
    props: ({ mutate }) => ({
      deleteQuestion: async (id) => {
        try {
          const {
            data: { deleteQuestion },
          } = await mutate({
            variables: { id },
          });
          message.destroy();
          message.success("Question deleted.");
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

const withQuestionSubmitting = (Component) =>
  graphql(SUBMIT_QUESTION, {
    props: ({ mutate }) => ({
      submitQuestion: async (input) => {
        try {
          const {
            data: { submitQuestion },
          } = await mutate({
            variables: { input },
          });
          message.destroy();
          message.success("Submit Question.");
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

  const withSectionSubmitting = (Component) =>
  graphql(SUBMIT_SECTION, {
    props: ({ mutate }) => ({
      submitSection: async (input) => {
        try {
          const {
            data: { submitSection },
          } = await mutate({
            variables: { input },
          });
          message.destroy();
          message.success("Submit Section.");
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

const withAddSection = (Component) =>
  graphql(ADD_SECTION, {
    props: ({ mutate }) => ({
      addSection: async (quizId) => {
        try {
          const {
            data: { addSection },
          } = await mutate({
            variables: { quizId },
          });
          message.destroy();
          message.success("Section Added.");
        } catch (e) {
          console.log(e);
          message.destroy();
          message.error("Couldn't perform the action");
          console.error(e);
        }
      },
    }),
  })(Component);

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

const updateQuizState = (quizUpdated, updateQuery) => {
  console.log("quiz updated", quizUpdated, updateQuery);
  const { mutation, node } = quizUpdated;
  updateQuery((prev) => {
    console.log("prev update", prev);
    var updatedQuiz = prev && prev.addQuizQuery;
    const prevId = prev && prev.addQuizQuery && prev.addQuizQuery.id;
    const newId = node && node.id;
    if (prevId == newId) {
      updatedQuiz = node;
    }

    return update(prev, {
      addQuizQuery: {
        $set: updatedQuiz,
      },
    });
  });
};

const updateQuizzesState = (quizzesUpdated, updateQuery) => {
  console.log("quiz updated");
  const { mutation, node } = quizzesUpdated;
  updateQuery((prev) => {
    console.log("prev update", prev);
    switch (mutation) {
      case "CREATED":
        console.log("quiz created");
        return addQuiz(prev, node);

      case "DELETED":
        console.log("quiz deleted");

        return deleteQuiz(prev, node.id);
      case "UPDATED":
        return deleteQuiz(prev, node.id);
      default:
        return prev;
    }
  });
};

function addQuiz(prev, node) {
  // check if it is duplicate
  if (prev.quizzes.some((quiz) => quiz.id === node.id)) {
    return prev;
  }
  console.log("add quiz", prev, node);
  return update(prev, {
    quizzes: {
      $set: [...prev.quizzes, node],
    },
  });
}

function deleteQuiz(prev, id) {
  console.log("prevv", prev);
  const index = prev.quizzes.findIndex((quiz) => quiz.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    quizzes: {
      $splice: [[index, 1]],
    },
  });
}

// export { withUsersState, withUsers, withUsersDeleting, withOrderByUpdating, withFilterUpdating };
export {
  updateQuizzesState,
  withAddQuizQuery,
  withQuizEditing,
  withSectionDeleting,
  withQuestionDeleting,
  withQuestionSubmitting,
  withAddSection,
  updateQuizState,
  withSectionSubmitting,
};
