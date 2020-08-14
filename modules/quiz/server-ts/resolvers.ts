import withAuth from "graphql-auth";
import { PubSub, withFilter } from "graphql-subscriptions";
import QuizStates from "@gqlapp/quiz-common/constants/QuizState";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import { countries } from "@gqlapp/quiz-common/constants/CountriesList";

const QUIZZES_SUBSCRIPTION = "quizzes_subscription";
const QUIZ_SUBSCRIPTION = "quiz_subscription";
const QUIZ_WITH_ANSWERS_SUBSCRIPTION = "quiz_with_answers_subscription";

export default (pubsub: any) => ({
  Query: {
    // async quiz(obj, {id}, {Quiz}) {
    //   const quiz = await Quiz.getQuiz(id);
    //   // console.log('user profile', userProfile);

    //   if (quiz) {
    //     return null;
    //   }

    //   return quiz;
    // },
    async quizzes(obj: any, { filter }: any, context: any) {
      return context.Quiz.getQuizzes(filter);
    },

    async quiz(obj: any, { id }: any, context: any) {
      return context.Quiz.getQuiz(id);
    },
    async addQuizQuery(obj: any, { userId }: any, context: any) {
      try {
        var quiz = await context.Quiz.getCurrentQuiz(userId);
        if (!quiz) {
          const quizData = {
            userId,
            state: QuizStates.CURRENT,
          };
          quiz = await context.Quiz.addCurrentQuiz(quizData);
        }
        return quiz;
      } catch (e) {
        return e;
      }
    },
    async quizWithAnswers(obj: any, { id, userId }: any, context: any) {
      const quiz = await context.Quiz.getQuizWithAnswersByUser(id, userId);
      console.log("quizzzzzz", quiz.sections[0].questions);
      return quiz;
    },
    // async answer(obj: any, { input }: any, context: any) {
    //   return context.Quiz.getAnswerByParams(input);
    // },
    // async answers(obj: any, { userId, quizId }: any, context: any) {
    //   const quiz = await context.Quiz.getQuiz(quizId);
    //   let questionIdArray = [];
    //   quiz && quiz.questions.map((question, key) => {
    //     questionIdArray.push(question.id);
    //   });
    //   console.log("ggggg", questionIdArray);
    //   let resultsArray = [];
    //   const params = { userId: userId, questionIdArray: questionIdArray };
    //   const result = await context.Quiz.getAnswersByParams(params);
    //   console.log("ggggggggggggg", result);

    //   return {
    //     answers: result,
    //   };
    // },
    async getAttendees(obj: any, { id }: any, context: any) {
      const attempts = await context.Quiz.getAttemptByQuizAndGroup(id);
      return {
        attempts: attempts,
      };
    },
    async getUserWiseResult(obj: any, { id, groupId }: any, context: any) {
      console.log("getUserWiseResultInput", id, groupId);
      const quiz = await context.Quiz.getQuizWithAnswers(id, groupId);

      quiz &&
        quiz.sections.map((see) =>
          see.questions.map((qu) => console.log("userwiseresultres", qu))
        );
      // ToDo replace attendees with attempts
      const attempts = await context.Quiz.getAttemptByQuizAndGroup(id, groupId);
      console.log("attempsattempts", attempts);
      let userIdArray = [];

      attempts.map((item, key) => {
        const found = userIdArray.find((id) => id === item.userId);
        if (!found || (found && found.length === 0)) {
          item.userId && userIdArray.push(item.userId);
        }
      });
      const users = await context.User.getUsersWithIdArray(userIdArray);
      let quizOut = {
        id: quiz && quiz.id,
        userId: quiz && quiz.userId,
        sections: quiz && quiz.sections,
        attendees: { users: users },
        attempts: attempts,
      };
      // quizOut.questions &&
      //   quizOut.questions.length !== 0 &&
      //   quizOut.questions.map((question, key1) => {
      //     question.results= [];
      //     result.map((re, key) => {
      //       if (re.questionId === question.id) {
      //         question.results.push(re);
      //       }
      //       quiz.questions[key1].question = question;
      //       console.log('result pushed', quiz.questions[key1].results);
      //     });
      //   });
      return quizOut;
    },
    async getQuizCount(obj: any, { id }: any, context: any) {
      try {
        let quiz = await context.Quiz.getQuizWithChoiceAnswers(id);
        quiz &&
          quiz.sections &&
          quiz.sections.map((sec, secI) => {
            sec &&
              sec.questions &&
              sec.questions.map((qu, quI) => {
                if (qu.choiceType === QuestionTypes.COUNTRIES) {
                  var countryChoices = [];
                  countries.map((couN, couKey) => {
                    const answerLists =
                      qu.answers &&
                      qu.answers.filter((ansW) => ansW.content === couN);
                    countryChoices.push({
                      id: couKey,
                      description: couN,
                      count: (answerLists && answerLists.length) || 0,
                    });
                  });
                  quiz.sections[secI].questions[quI].countries = countryChoices;
                } else {
                  qu &&
                    qu.choices &&
                    qu.choices.map((cho, choI) => {
                      quiz.sections[secI].questions[quI].choices[choI].count =
                        cho && cho.answers && cho.answers.length;
                      delete quiz.sections[secI].questions[quI].choices[choI]
                        .answers;
                    });
                }
              });
          });
        return quiz;
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    async addQuiz(obj: any, { input }: any, { Quiz, User }: any) {
      const id = await Quiz.addQuiz(input);
      var newQuiz = await Quiz.getQuiz(id);
      const getUser = await User.getUserForQuizSubscription(newQuiz.userId);
      newQuiz.user = getUser;
      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);
      pubsub.publish(QUIZZES_SUBSCRIPTION, {
        quizzesUpdated: {
          mutation: "CREATED",
          node: newQuiz,
        },
      });
      if (id) {
        return newQuiz;
      } else {
        return null;
      }
    },

    async addSection(obj: any, { quizId }: any, { Quiz, User }: any) {
      try {
        const section = await Quiz.addEmptySection(quizId);
        if (section) {
          await Quiz.changeQuizState(quizId, QuizStates.UPDATED);
        }
        var newQuiz = await Quiz.getQuiz(quizId);
        const getUser = await User.getUserForQuizSubscription(newQuiz.userId);
        newQuiz.user = getUser;
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: newQuiz && newQuiz.id,
            node: newQuiz,
          },
        });
        return section;
      } catch (e) {
        return null;
      }
    },

    async submitSection(obj: any, { input }: any, { Quiz, User }: any) {
      try {
        var sectionExists = null;
        var sectionSubmitted = null;
        if (input.id) {
          sectionExists = await Quiz.getSection(input.id);
        }
        if (sectionExists) {
          sectionSubmitted = await Quiz.updateSection(input);
        } else {
          sectionSubmitted = await Quiz.addSection(input);
        }
        var newQuiz = await Quiz.getQuiz(input.quizId);
        const getUser = await User.getUserForQuizSubscription(newQuiz.userId);
        newQuiz.user = getUser;
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: newQuiz && newQuiz.id,
            node: newQuiz,
          },
        });
        return sectionSubmitted;
      } catch (e) {
        return e;
      }
    },

    async submitQuestion(obj: any, { input }: any, { Quiz, User }: any) {
      try {
        var questionExists = null;
        var questionSubmitted = null;
        if (input.id) {
          questionExists = await Quiz.getQuestionItem(input.id);
        }
        if (questionExists) {
          questionSubmitted = await Quiz.updateQuestion(input);
        } else {
          questionSubmitted = await Quiz.addQuestion(input);
        }
        const sectionItem = await Quiz.getSection(
          questionSubmitted && questionSubmitted.sectionId
        );
        var newQuiz = await Quiz.getQuiz(sectionItem && sectionItem.quizId);
        const getUser = await User.getUserForQuizSubscription(newQuiz.userId);
        newQuiz.user = getUser;
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: newQuiz && newQuiz.id,
            node: newQuiz,
          },
        });
        return questionSubmitted;
      } catch (e) {
        return e;
      }
    },

    deleteQuiz: withAuth(async (obj: any, { id }: any, { Quiz }: any) => {
      try {
        const data = await Quiz.getQuiz(id);
        await Quiz.deleteQuiz(id);
        pubsub.publish(QUIZZES_SUBSCRIPTION, {
          quizzesUpdated: {
            mutation: "DELETED",
            node: data,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    }),

    async deleteSection(obj: any, { id }: any, { Quiz, User }: any) {
      try {
        const data = await Quiz.getSection(id);
        await Quiz.deleteSection(id);
        var newQuiz;
        if (data) {
          newQuiz = await Quiz.getQuiz(data.quizId);
          const getUser = await User.getUserForQuizSubscription(
            newQuiz && newQuiz.userId
          );
          newQuiz.user = getUser;
        }
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: newQuiz && newQuiz.id,
            node: newQuiz,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },

    async deleteQuestion(obj: any, { id }: any, { Quiz, User }: any) {
      try {
        const data = await Quiz.getQuestionItem(id);
        await Quiz.deleteQuestion(id);
        const sectionItem = await Quiz.getSection(data && data.sectionId);

        var newQuiz = await Quiz.getQuiz(sectionItem && sectionItem.quizId);
        const getUser = await User.getUserForQuizSubscription(
          newQuiz && newQuiz.userId
        );
        newQuiz.user = getUser;
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: newQuiz && newQuiz.id,
            node: newQuiz,
          },
        });
        return data;
      } catch (e) {
        return e;
      }
    },

    editQuiz: withAuth(async (obj: any, { input }: any, { Quiz }: any) => {
      try {
        const inputId = input.id;

        // if (input.authorId) {
        //   input.authorId = await Profile.getProfileId(input.authorId);
        // }
        // delete input.id;
        // delete input.tags;
        const isDeleted = await Quiz.editQuiz(input);
        var item = await Quiz.getQuiz(inputId);
        // pubsub.publish(QUIZZES_SUBSCRIPTION, {
        //   quizzesUpdated: {
        //     mutation: 'UPDATED',
        //     node: item
        //   }
        // });
        // const getUser = await Quiz.getQuiz(item.userId)
        // item.user = getUser;
        pubsub.publish(QUIZZES_SUBSCRIPTION, {
          quizzesUpdated: {
            mutation: "UPDATED",
            node: item,
          },
        });
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizUpdated: {
            mutation: "UPDATED",
            id: item && item.id,
            node: item,
          },
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    async addAttempt(obj: any, { input }: any, { Quiz }: any) {
      console.log("addAttemptInput", input);
      try {
        const { quizId, userId } = input;
        var attempt = await Quiz.getAttemptByParams({ quizId, userId });
        console.log("addAttemptAttemptExists", attempt);
        if (attempt) {
          input.id = attempt.id;
          attempt = await Quiz.editAttempt(input);
          console.log("editAttemptttttt", attempt);
        } else {
          attempt = await Quiz.addAttempt(input);
          console.log("addAttemptttttt", attempt);
        }
        const quiz =
          attempt &&
          (await Quiz.getQuizWithAnswersByUser(attempt.quizId, attempt.userId));
        quiz &&
          quiz.sections &&
          quiz.sections.map(
            (Sec) =>
              Sec &&
              Sec.questions &&
              Sec.questions.map((Que) => {
                console.log("quizAttemptedQuestions", Que);
              })
          );
        pubsub.publish(QUIZ_WITH_ANSWERS_SUBSCRIPTION, {
          quizWithAnswersUpdated: {
            mutation: "UPDATED",
            id: quiz && quiz.id,
            node: quiz,
          },
        });
        return attempt;
      } catch (e) {
        return e;
      }
    },
    // async addAnswers(obj: any, { input }: any, { Quiz }: any) {
    //   try {
    //     var userId;
    //     var sectionId;
    //     // const editedResult = Quiz.addAnswers(input.results);
    //     // if(editedResult)
    //     // {
    //     //   sectionId = questionItem.sectionId;
    //     //   userId = input && input.results[0].userId;
    //     // }
    //     input.results.map(async (result, item) => {
    //       const ansExists = await Quiz.getAnswerByParams(result);
    //       var isDone;
    //       const questionItem = await Quiz.getQuestion(
    //         input.results && input.results[0].questionId
    //       );
    //       if (ansExists && ansExists.length !== 0) {
    //         isDone = await Quiz.updateAnswer(result);
    //       } else {
    //         isDone = await Quiz.addAnswer(result);
    //       }
    //       sectionId = questionItem.sectionId;
    //       userId = result.userId;
    //     });
    //     const quizI = await Quiz.getQuizBySectionId(sectionId);
    //     const id = quizI && quizI.id;
    //     const item = await Quiz.getQuizWithAnswersByUser(id, userId);

    //     pubsub.publish(QUIZZES_SUBSCRIPTION, {
    //       quizzesUpdated: {
    //         mutation: "UPDATED",
    //         node: item,
    //       },
    //     });
    //     return true;
    //   } catch (e) {
    //     return e;
    //   }
    // },
    // async addAnswer(obj: any, { input }: any, { Quiz }: any) {
    //   console.log("input in res", input);
    //   const ansExists = await Quiz.getAnswerByParams(input);
    //   console.log("ansexists", ansExists);
    //   var isDone;
    //   const questionItem = await Quiz.getQuestion(input.questionId);
    //   console.log("question existss", questionItem);
    //   var questionHasChoice = false;
    //   questionItem.map((item, key) => {
    //     if (item.id === input.choiceId) {
    //       questionHasChoice = true;
    //     }
    //   });
    //   if (!questionHasChoice) {
    //     return null;
    //   }
    //   if (ansExists && ansExists.length !== 0) {
    //     isDone = await Quiz.updateAnswer(input);
    //   } else {
    //     isDone = await Quiz.addAnswer(input);
    //   }
    //   console.log("ansexists123", isDone);

    //   const newAnswer = await Quiz.getAnswerByParams(input);
    //   console.log("ansexists123444", newAnswer);

    //   // const isAdded = Quiz.addQuiz(input);
    //   // console.log('quiz added', isAdded);

    //   // const quiz = await Quiz.getQuiz(id);
    //   // console.log('user profile', userProfile);

    //   if (isDone) {
    //     return newAnswer[0];
    //   } else {
    //     return null;
    //   }
    // },
    duplicateQuiz: withAuth(
      async (
        obj: any,
        input: { userId: number; quizId: number },
        context: any
      ) => {
        try {
          const res = await context.Quiz.duplicateQuiz(
            input.userId,
            input.quizId
          );
          const getQuiz = await context.Quiz.getQuiz(res.id);
          // const getUser = await context.User.getUserForQuizSubscription(res.userId)
          // res.user = getUser;
          pubsub.publish(QUIZZES_SUBSCRIPTION, {
            quizzesUpdated: {
              mutation: "CREATED",
              node: getQuiz,
            },
          });
          return res;
        } catch (e) {
          return e;
        }
      }
    ),
  },
  Subscription: {
    quizzesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUIZZES_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.quizzesUpdated;
          const {
            // filter: { searchText }
          } = variables;
          // const checkByFilter =
          // (!model || model === node.model.name) &&
          // (!status || status === node.status) &&
          // (!searchText ||
          //   node.title.toUpperCase().includes(searchText.toUpperCase()))
          //   node.description.toUpperCase().includes(searchText.toUpperCase()) ||
          //   node.tags.some((item: any) => item.text.toUpperCase().includes(searchText.toUpperCase())));

          switch (mutation) {
            case "DELETED":
              return true;
            case "CREATED":
              return true;
            case "UPDATED":
              return true;
          }
        }
      ),
    },
    quizUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUIZ_SUBSCRIPTION),
        (payload, variables) => {
          return (
            payload &&
            payload.quizUpdated &&
            payload.quizUpdated.id === variables.id
          );
        }
      ),
    },
    quizWithAnswersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUIZ_WITH_ANSWERS_SUBSCRIPTION),
        (payload, variables) => {
          return (
            payload &&
            payload.quizWithAnswersUpdated &&
            payload.quizWithAnswersUpdated.id === variables.id
          );
        }
      ),
    },
  },
});
