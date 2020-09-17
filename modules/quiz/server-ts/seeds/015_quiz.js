import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import QuestionTypes from '@gqlapp/quiz-common/constants/QuestionTypes';

const questionTypes = [QuestionTypes.MSELECT, QuestionTypes.RADIO, QuestionTypes.TEXTAREA, QuestionTypes.TEXTBOX, QuestionTypes.SELECT];

export async function seed(knex) {
  await truncateTables(knex, Promise, ['quiz', 'question', 'choice', 'answer']);

  await Promise.all(
    [...Array(30).keys()].map(async i => {
      return returnId(knex('quiz')).insert({
        user_id:1,
        active:true,
        title: `Placement Quiz ${i + 1}`,
        description: `Who wants to get hired?`,
        is_public:i%2 === 0,
        is_editable_by_user: true
      });
      
    })
    
  );

  // await Promise.all(
  //   [...Array(10).keys()].map(async i => {
  //       return returnId(knex('question')).insert({
  //         quiz_id:quizId,
  //         is_active:true,
  //         description: `Whats Your Name? `,
  //         choice_type: true
  //       });
  //       console.log('quiz id:', quizId);
        
  //   })
  // );
}
