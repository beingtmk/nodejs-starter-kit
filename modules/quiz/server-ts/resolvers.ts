import withAuth from 'graphql-auth';


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
    async answer(obj: any, { input }: any, context: any) {
      return context.Quiz.getAnswerByParams(input);
    }
  },
  Mutation: {
    async addQuiz(obj: any, { input }:any, { Quiz }:any) {
      console.log('input in res', input);
      const isAdded = Quiz.addQuiz(input);
      console.log('quiz added', isAdded);

      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);

      if (isAdded) {
        return true;
      } else {
        return false;
      }
    },
    deleteQuiz: withAuth(async (obj: any, { id }: any, { Quiz }: any) => {
      try {
        const data = await Quiz.getQuiz(id);
        await Quiz.deleteQuiz(id);
        // pubsub.publish(BLOGS_SUBSCRIPTION, {
        //   blogsUpdated: {
        //     mutation: 'DELETED',
        //     node: data
        //   }
        // });
        return data;
      } catch (e) {
        return e;
      }
    }),
    editQuiz: withAuth(async (obj: any, { input }: any, { Quiz }: any) => {
      // try {
        const inputId = input.id;
        console.log('quiz edit resolvers1', input);

        // if (input.authorId) {
        //   input.authorId = await Profile.getProfileId(input.authorId);
        // }
        // delete input.id;
        // delete input.tags;
        const isDeleted = await Quiz.editQuiz(input);
        const item = await Quiz.getQuiz(inputId);
        // pubsub.publish(BLOGS_SUBSCRIPTION, {
        //   blogsUpdated: {
        //     mutation: 'UPDATED',
        //     node: item
        //   }
        // });
        return item;
      // } catch (e) {
      //   return e;
      // }
    }),
    async addAnswer(obj: any, { input }:any, { Quiz }:any) {
      console.log('input in res', input);
      const ansExists = await Quiz.getAnswerByParams(input);
      console.log('ansexists', ansExists);
      var isDone;
      const questionItem = await Quiz.getQuestion(input.questionId);
      console.log('question existss', questionItem);
      var questionHasChoice = false;
      questionItem.map((item, key)=>{
        if(item.id === input.choiceId){
          questionHasChoice = true;
        }
      })
      if(!questionHasChoice){
        return null;
      }
      if(ansExists && ansExists.length !==0){
        isDone = await Quiz.updateAnswer(input);
      }else{
        isDone = await Quiz.addAnswer(input);
      }
      console.log('ansexists123', isDone);

      const newAnswer = await Quiz.getAnswerByParams(input);
      console.log('ansexists123444', newAnswer);

      // const isAdded = Quiz.addQuiz(input);
      // console.log('quiz added', isAdded);

      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);

      if (isDone) {
        return newAnswer[0];
      } else {
        return null;
      }
    },
  },
  Subscription: {}
});
