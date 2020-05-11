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
    },
    async answers(obj: any, { userId, quizId }: any, context: any) {
      const quiz = await context.Quiz.getQuiz(quizId)
      let questionIdArray = []
      quiz.questions.map((question, key)=>{
        questionIdArray.push(question.id);
      })
      console.log('ggggg', questionIdArray);
      let resultsArray = [];
      const queried = questionIdArray.length !==0 &&  questionIdArray.map((queId, key)=>{
        const params = {userId: userId, questionId: queId}
        const result = context.Quiz.getAnswerByParams(params);
        console.log('resssss', result)
        resultsArray.push(result[0]);
      })
      console.log('ggggggggggggg', resultsArray);

      return resultsArray ;
    }
  },
  Mutation: {
    async addQuiz(obj: any, { input }:any, { Quiz }:any) {
      console.log('input in res', input);
      const id = await Quiz.addQuiz(input);
      console.log('quiz added', id);
      const newQuiz = await Quiz.getQuiz(id);
      console.log('neee', newQuiz);
      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);

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
      try {
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
      } catch (e) {
        return e;
      }
    }),
    async addAnswers(obj: any, { input }:any, { Quiz }:any) {
      try{
        input.results.map((result, item)=>{
          Quiz.addAnswer(result);
        })
        return true;
      }catch (e){
        return false;
      }
    },
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
