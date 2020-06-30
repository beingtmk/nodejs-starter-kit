import withAuth from "graphql-auth";
import { PubSub, withFilter } from "graphql-subscriptions";

const QUIZ_SUBSCRIPTION = "quiz_subscription";

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
    async quizWithAnswers(obj: any, { id, userId }: any, context: any) {
      const quiz = await context.Quiz.getQuizWithAnswersByUser(id, userId);
      console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqq", quiz);
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
      const quiz = await context.Quiz.getQuiz(id);
      let questionIdArray = [];
      quiz &&
        quiz.sections &&
        quiz.sections.map((sect) => {
          sect &&
            sect.questions &&
            sect.questions.map((question, key) => {
              questionIdArray.push(question.id);
            });
        });
      console.log("ggggg", questionIdArray);

      const params = { questionIdArray: questionIdArray };
      const result = await context.Quiz.getAnswersByQuestionArray(params);
      console.log("ggggggggggggg", result);
      let userIdArray = [];
      result.map((item, key) => {
        const found = userIdArray.find((id) => id === item.userId);
        console.log("found", found);
        if (!found || (found && found.length === 0)) {
          userIdArray.push(item.userId);
        }
      });
      console.log("userIddd", userIdArray);
      const users = await context.User.getUsersWithIdArray(userIdArray);
      console.log("usersss", users);
      return {
        users: users,
      };
    },
    async getUserWiseResult(obj: any, { id, groupId }: any, context: any) {
      const quiz = await context.Quiz.getQuizWithAnswers(id, groupId);

      // let questionIdArray = [];
      // quiz.questions.map((question, key) => {
      //   questionIdArray.push(question.id);
      // });
      // console.log("ggggg", questionIdArray);

      // const params = { questionIdArray: questionIdArray };
      var result = [];
      let userIdArray = [];
      quiz &&
        quiz.sections &&
        quiz.sections.map((section) => {
          section &&
            section.questions &&
            section.questions.map((ques) => {
              ques &&
                ques.answers &&
                ques.answers.map((ans) => {
                  result.push(ans);
                });
            });
        });
      console.log("ggggggggggggg", result);
      result.map((item, key) => {
        const found = userIdArray.find((id) => id === item.userId);
        console.log("found", found);
        if (!found || (found && found.length === 0)) {
          userIdArray.push(item.userId);
        }
      });
      console.log("userIddd", userIdArray);
      const users = await context.User.getUsersWithIdArray(userIdArray);
      console.log("usersss", users);
      let quizOut = {
        id: quiz.id,
        userId: quiz.userId,
        sections: quiz.sections,
        attendees: { users: users },
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
      console.log("quizOut", quizOut);
      return quizOut;
    },
    async getQuizCount(obj: any, { id }: any, context: any) {
      try {
        let quiz = await context.Quiz.getQuizWithChoiceAnswers(id);
        console.log(quiz);
        quiz &&
          quiz.sections &&
          quiz.sections.map((sec, secI) => {
            sec &&
              sec.questions &&
              sec.questions.map((qu, quI) => {
                qu &&
                  qu.choices &&
                  qu.choices.map((cho, choI) => {
                    quiz.sections[secI].questions[quI].choices[choI].count =
                      cho && cho.answers && cho.answers.length;
                    delete quiz.sections[secI].questions[quI].choices[choI]
                      .answers;
                  });
              });
          });
        return quiz;
      } catch (e) {
        return null;
      }
    },
  },
  Mutation: {
    async addQuiz(obj: any, { input }: any, { Quiz, User }: any) {
      console.log("input in res", input);
      const id = await Quiz.addQuiz(input);
      console.log("quiz added", id);
      var newQuiz = await Quiz.getQuiz(id);
      const getUser = await User.getUserForQuizSubscription(newQuiz.userId);
      newQuiz.user = getUser;
      console.log("neee", newQuiz);
      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);
      pubsub.publish(QUIZ_SUBSCRIPTION, {
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
    deleteQuiz: withAuth(async (obj: any, { id }: any, { Quiz }: any) => {
      try {
        const data = await Quiz.getQuiz(id);
        await Quiz.deleteQuiz(id);
        pubsub.publish(QUIZ_SUBSCRIPTION, {
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
    editQuiz: withAuth(async (obj: any, { input }: any, { Quiz }: any) => {
      try {
        const inputId = input.id;
        console.log("quiz edit resolvers1", input);

        // if (input.authorId) {
        //   input.authorId = await Profile.getProfileId(input.authorId);
        // }
        // delete input.id;
        // delete input.tags;
        const isDeleted = await Quiz.editQuiz(input);
        var item = await Quiz.getQuiz(inputId);
        // pubsub.publish(QUIZ_SUBSCRIPTION, {
        //   quizzesUpdated: {
        //     mutation: 'UPDATED',
        //     node: item
        //   }
        // });
        // const getUser = await Quiz.getQuiz(item.userId)
        // item.user = getUser;
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizzesUpdated: {
            mutation: "UPDATED",
            node: item,
          },
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    async addAnswers(obj: any, { input }: any, { Quiz }: any) {
      try {
        var userId;
        var sectionId;
        input.results.map(async (result, item) => {
          const ansExists = await Quiz.getAnswerByParams(result);
          console.log("ansexists", ansExists);
          var isDone;
          const questionItem = await Quiz.getQuestion(result.questionId);
          console.log("question existss", questionItem);
          if (ansExists && ansExists.length !== 0) {
            isDone = await Quiz.updateAnswer(result);
          } else {
            isDone = await Quiz.addAnswer(result);
          }
          sectionId = questionItem.sectionId;
          userId = result.userId;
        });
        const quizI = await Quiz.getQuizBySectionId(sectionId);
        const id = quizI && quizI.id;
        const item = await Quiz.getQuizWithAnswersByUser(id, userId);

        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizzesUpdated: {
            mutation: "UPDATED",
            node: item,
          },
        });
        return true;
      } catch (e) {
        return e;
      }
    },
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
        try{const res = await context.Quiz.duplicateQuiz(
          input.userId,
          input.quizId
        );
        const getQuiz = await context.Quiz.getQuiz(res.id);
        console.log('ressssss', getQuiz);
        // const getUser = await context.User.getUserForQuizSubscription(res.userId)
      // res.user = getUser;
      console.log('copiiiied', getQuiz)
        pubsub.publish(QUIZ_SUBSCRIPTION, {
          quizzesUpdated: {
            mutation: 'CREATED',
            node: getQuiz
          }
        });
        return res;}
        catch (e){
          return e;
        }
      }
    )
  },
  Subscription: {
    quizzesUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(QUIZ_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.quizzesUpdated;
          console.log("subsss", node);
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
  },
});
