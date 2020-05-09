

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

    async quiz(obj: any, { id }: any, context: any) {
      return context.Quiz.getQuiz(id);
    }
  },
  Mutation: {
    async addQuiz(obj, {input}, {Quiz}) {
      console.log('input in res', input);
      const isAdded = Quiz.addQuiz(input);
      console.log('quiz added', isAdded);

      // const quiz = await Quiz.getQuiz(id);
      // console.log('user profile', userProfile);
      
      if (isAdded) {
        return true;
      }else{
        return false
      }
    }
  },
  Subscription: {}
});
