import {
  camelizeKeys,
  decamelizeKeys
  //  decamelize
} from 'humps';
import { knex } from '@gqlapp/database-server-ts';

import { Model } from 'objection';
import { has } from 'lodash';

import { User } from '@gqlapp/user-server-ts/sql';
import { Identifier } from '@gqlapp/chat-server-ts/sql';

const eager = '[user, questions.[choices]]';

export default class Quiz extends Model {
  static get tableName() {
    return 'quiz';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'quiz.user_id',
          to: 'user.id'
        }
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: 'quiz.id',
          to: 'question.quiz_id'
        }
      }
    };
  }

  public async getQuizzes(filter:any) {
    const queryBuilder = await Quiz.query().eager(eager);
    const res = camelizeKeys(queryBuilder);
    return res;
  }

  public async getQuiz(id: number) {
    const res = camelizeKeys(
      await Quiz.query()
      .findById(id)
      .withGraphFetched(eager)
        // .eager(eager)
        // .orderBy('id', 'desc')
    );
    return res;
  }

  public async addQuiz(input:any) {
    console.log('quizzz added11', input);

    const res = await Quiz.query().insertGraph(decamelizeKeys(input));
    console.log('quizzz added', res);
    return res;
  }

  public async editQuiz( input:any ) {
    console.log('quiz edit sql', decamelizeKeys(input));

    const res = await Quiz.query().upsertGraph(decamelizeKeys(input));
    console.log('sql res', res);

    return res;
  }
  

  public async deleteQuiz( id: number ) {
    return knex('quiz')
      .where('id', '=', id)
      .del();
  }
}

export class Question extends Model {
  static get tableName() {
    return 'question';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'question.quiz_id',
          to: 'quiz.id',
        },
      },
      choices: {
        relation: Model.HasManyRelation,
        modelClass: Choice,
        join: {
          from: 'question.id',
          to: 'choice.question_id',
        },
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: 'question.id',
          to: 'answer.question_id',
        },
      },
    };
  }
}

export class Choice extends Model {
  static get tableName() {
    return 'choice';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'choice.question_id',
          to: 'question.id',
        },
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: 'choice.id',
          to: 'answer.choice_id',
        },
      },
    };
  }
}

export class Answer extends Model {
  static get tableName() {
    return 'answer';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: 'answer.question_id',
          to: 'question.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'answer.user_id',
          to: 'user.id',
        },
      },
      choice: {
        relation: Model.BelongsToOneRelation,
        modelClass: Choice,
        join: {
          from: 'answer.choice_id',
          to: 'choice.id',
        },
      },
    };
  }
}
