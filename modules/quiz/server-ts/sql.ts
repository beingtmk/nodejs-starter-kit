import {
  camelizeKeys,
  decamelizeKeys,
  //  decamelize
} from "humps";
import { knex } from "@gqlapp/database-server-ts";

import { Model } from "objection";
import { has } from "lodash";

import { User } from "@gqlapp/user-server-ts/sql";
import { Identifier } from "@gqlapp/chat-server-ts/sql";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";

const eager = "[user, questions.[choices]]";
const eagerWithCount = "[user, questions.[choices]]";
const withAnswersEager = "[user, questions.[choices, answers]]";

export default class Quiz extends Model {
  static get tableName() {
    return "quiz";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "quiz.user_id",
          to: "user.id",
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "quiz.id",
          to: "question.quiz_id",
        },
      },
    };
  }

  public async getQuizzes(filter: any) {
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
  public async getQuizWithCreatedChoice(id: number, userId: number) {
    console.log("inpppput", userId);
    const questionsWithTextChoice = camelizeKeys(
      await knex("question")
        .select("question.id")
        // .leftJoin("question", "choice.question_id", "question.id")
        .leftJoin("quiz", "question.quiz_id", "quiz.id")
        .where("question.choice_type", QuestionTypes.TEXTBOX)
        .orWhere("question.choice_type", QuestionTypes.TEXTAREA)
    );
    console.log("qqqqqqqqq", questionsWithTextChoice);

    await questionsWithTextChoice.map(async (que, key) => {
      const choi = camelizeKeys(
        await knex
          .select("choice.id as choi_id")
          .from('choice')
          .leftJoin("question", "choice.question_id", "question.id")
          .leftJoin("quiz", "question.quiz_id", "quiz.id")
          .where("question.id", que.id)
          .andWhere("choice.private_id", userId)
          .first()
        // .where('choice.user_id', 1)
      );
      console.log("chhhhooooiii", choi);
      if (!choi) {
        await knex("choice").insert({
          question_id: que.id,
          description: "",
          private_id: userId,
        });
      } else {
        await knex("choice").insert({
          id: choi.choiId,
          question_id: que.id,
          description: "",
          private_id: userId,
        });
      }
    });
    const res = camelizeKeys(
      await Quiz.query()
        .findById(id)
        .withGraphFetched(eager)
        .leftJoin("question", "question.quiz_id", "quiz.id")
        .leftJoin("choice", "choice.question_id", "question.id")
      // .where("choice.private_id", userId)
      // .where('choice.private')
      // .eager(eager)
      // .orderBy('id', 'desc')
    );
    console.log("bbbbbbbbbbb", res);

    return res;
  }
  public async getQuizWithAnswers(id: number) {
    const res = camelizeKeys(
      await Quiz.query()
        .findById(id)
        .withGraphFetched(withAnswersEager)
      // .eager(eager)
      // .orderBy('id', 'desc')
    );
    return res;
  }

  public async addQuiz(input: any) {
    console.log("quizzz added11", input);

    const res = camelizeKeys(
      await Quiz.query().insertGraph(decamelizeKeys(input))
    );
    // console.log("quizzz added", res);
    return res.id;
  }

  public async editQuiz(input: any) {
    console.log("quiz edit sql", decamelizeKeys(input));

    const res = await Quiz.query().upsertGraph(decamelizeKeys(input));
    console.log("sql res", res);

    return res;
  }

  public async deleteQuiz(id: number) {
    return knex("quiz")
      .where("id", "=", id)
      .del();
  }

  public async addAnswer(input: any) {
    const res = await knex("answer")
      .returning("id")
      .insert(decamelizeKeys(input));
    console.log("resssssss", res);
    return res;
  }

  public async updateAnswer(input: any) {
    const res = await knex("answer")
      .update(decamelizeKeys(input))
      .where({ user_id: input.userId })
      .andWhere({ question_id: input.questionId });
    return res;
  }

  public async getAnswerByParams(params: any) {
    const res = camelizeKeys(
      await knex("answer")
        .where({ user_id: params.userId })
        .andWhere({ question_id: params.questionId })
    );
    return res;
  }
  public async getAnswersByParams(params: any) {
    const res = camelizeKeys(
      await knex("answer")
        .where({ user_id: params.userId })
        .andWhere(function() {
          this.whereIn("answer.question_id", params.questionIdArray);
        })
    );
    return res;
  }
  public async getAnswersByQuestionArray(params: any) {
    const res = camelizeKeys(
      await knex("answer")
        // .where({ user_id: params.userId })
        .where(function() {
          this.whereIn("answer.question_id", params.questionIdArray);
        })
    );
    return res;
  }
  public async getAnswersByChoiceArray(params: any) {
    const res = camelizeKeys(
      await knex("answer")
        // .where({ user_id: params.userId })
        .where(function() {
          this.whereIn("answer.choice_id", params.choiceIdArray);
        })
    );
    return res;
  }

  public async getQuestion(id: number) {
    const res = camelizeKeys(
      await knex
        .select("q.id", "qc.id")
        .from("question AS q")
        .where("q.id", "=", id)
        .leftJoin("choice AS qc", "qc.question_id", "q.id")
      // .where({ user_id: params.userId })
      // .andWhere({ question_id: params.questionId })
    );
    return res;
  }
  // public async getQuizCountById(id: number) {
  //   const res = camelizeKeys(
  //     await Quiz.query()
  //       .findById(id)
  //       // .select('q')
  //       .withGraphFetched(eagerWithCount)
  //       .modifyGraph('choices', (builder) =>{
  //           console.log('cccccooooouuuuunnnnnttttt', Choice.relatedQuery('answers').count());
  //           builder.select('*', Choice.relatedQuery('answer').count().as('count'))
  //         })
  //         .first()
  //         .from('quiz as q')
  //         .leftJoin('question as qu', 'qu.quiz_id', 'q.id')
  //         .leftJoin('choice as ch', 'ch.question_id', 'qu.id')
  //         .leftJoin('answer as a', 'a.choice_id', 'ch.id')
  //       // .eager(eager)
  //     // .orderBy('id', 'desc')
  //   );
  //   return res;
  // }

  // public async getChoiceWithCount(params){
  //   return camelizeKeys(
  //     await Choice.query()
  //     .select(['Choice.*', Choice.relatedQuery('answers').count().as('count')])
  //     .where(function() {
  //     this.whereIn('answer.choice_id', params.choiceIdArray);
  //   }))
  // }
}

export class Question extends Model {
  static get tableName() {
    return "question";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "question.quiz_id",
          to: "quiz.id",
        },
      },
      choices: {
        relation: Model.HasManyRelation,
        modelClass: Choice,
        join: {
          from: "question.id",
          to: "choice.question_id",
        },
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: "question.id",
          to: "answer.question_id",
        },
      },
    };
  }
}

export class Choice extends Model {
  static get tableName() {
    return "choice";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "choice.question_id",
          to: "question.id",
        },
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: "choice.id",
          to: "answer.choice_id",
        },
      },
    };
  }
}

export class Answer extends Model {
  static get tableName() {
    return "answer";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "answer.question_id",
          to: "question.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "answer.user_id",
          to: "user.id",
        },
      },
      choice: {
        relation: Model.BelongsToOneRelation,
        modelClass: Choice,
        join: {
          from: "answer.choice_id",
          to: "choice.id",
        },
      },
    };
  }
}
