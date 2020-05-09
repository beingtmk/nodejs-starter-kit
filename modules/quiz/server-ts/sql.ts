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

const eager = '[user]';

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
      }
    };
  }

  public async getQuizzes(filter) {
    const queryBuilder = await Quiz.query().eager(eager);
    const res = camelizeKeys(queryBuilder);
    return res;
  }

  public async getQuiz(id: number) {
    const res = camelizeKeys(
      await Quiz.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addQuiz(input) {
    console.log('quizzz added11', input);

    const res = await Quiz.query().insertGraph(decamelizeKeys(input));
    console.log('quizzz added', res);
    return res;
  }

  public async editQuiz( input ) {
    console.log('quiz edit sql', decamelizeKeys(input));

    const res = await Quiz.query().upsertGraph(decamelizeKeys(input));
    // console.log('profile edit resolvers', res);

    return res;
  }
  

  public async deleteQuiz( id ) {
    return knex('quiz')
      .where('id', '=', id)
      .del();
  }
}
