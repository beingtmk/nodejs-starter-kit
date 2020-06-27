import {
  camelizeKeys,
  decamelizeKeys,
  //  decamelize
} from "humps";
import { knex } from "@gqlapp/database-server-ts";

import { Model } from "objection";
import { has } from "lodash";

import { User } from "@gqlapp/user-server-ts/sql";
import { GroupMember } from "@gqlapp/group-server-ts/sql";
import { Identifier } from "@gqlapp/chat-server-ts/sql";
import QuestionTypes from "@gqlapp/quiz-common/constants/QuestionTypes";
import { user } from "@gqlapp/blog-client-react/demoData";

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
      sections: {
        relation: Model.HasManyRelation,
        modelClass: Section,
        join: {
          from: "quiz.id",
          to: "section.quiz_id",
        },
      },
      attempts: {
        relation: Model.HasManyRelation,
        modelClass: Attempt,
        join: {
          from: "quiz.id",
          to: "attempt.quiz_id",
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
  public async getQuizWithAnswersByUser(id: number, userId: number) {
    var res;
    res = camelizeKeys(
      await Quiz.query()
        .findById(id)
        .withGraphFetched(eager)
        .first()
      // .where('questions:answers.user_id', userId)
      // .joinRelated("answer")
      // .where("answer.user_id", userId)
      // .eager(eager)
      // .orderBy('id', 'desc')
    );
    var questionsIdArray = [];
    res.questions &&
      res.questions.map((qu) => {
        questionsIdArray.push(qu.id);
      });
    const answers = camelizeKeys(
      await knex("answer")
        .whereIn("answer.question_id", questionsIdArray)
        .where("answer.user_id", userId)
    );

    if (!answers || (answers && answers.length === 0)) {
      return res;
    }
    answers &&
      answers.map((ans) => {
        var q = res.questions.find((ques) => ques.id === ans.questionId);
        const index = res.questions.indexOf(q);
        q.answers = [];
        q.answers.push(ans);
        res.questions[index] = q;
      });
    console.log("bbbbbbbbbbb", res);

    return res;
  }

  public async getQuizWithAnswers(id: number, groupId: number) {
    if (!groupId) {
      const res = camelizeKeys(
        await Quiz.query()
          .findById(id)
          .withGraphFetched(withAnswersEager)
        // .eager(eager)
        // .orderBy('id', 'desc')
      );
      return res;
    }
    var res = camelizeKeys(
      await Quiz.query()
        .findById(id)
        .withGraphFetched(eager)
        .first()
      // .eager(eager)
      // .orderBy('id', 'desc')
    );

    const usersByGroup = await knex("group_member")
      .leftJoin("user", "user.email", "group_member.email")
      .select("user.id as userId")
      .where("group_member.group_id", groupId);
    console.log("usersBygroup", usersByGroup);
    if (usersByGroup && usersByGroup.length === 0) {
      return res;
    }
    var userIdArray = [];
    usersByGroup &&
      usersByGroup.map((uu) => {
        userIdArray.push(uu.userId);
      });
    var questionsIdArray = [];
    res.questions &&
      res.questions.map((qu) => {
        questionsIdArray.push(qu.id);
      });
    const answers = camelizeKeys(
      await knex("answer")
        .whereIn("answer.question_id", questionsIdArray)
        .whereIn("answer.user_id", userIdArray)
    );
    console.log("answers", answers);
    if (answers && answers.length === 0) {
      return res;
    }
    answers &&
      answers.map((ans) => {
        var q = res.questions.find((ques) => ques.id === ans.questionId);
        const index = res.questions.indexOf(q);
        if (!q.answers) {
          q.answers = [];
        }
        q.answers.push(ans);
        res.questions[index] = q;
      });
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
  public async duplicateQuiz(userId: number, quizId: number) {
    var insertData = await Quiz.query()
      .eager(eager)
      .where("id", "=", quizId)
      .first();

    function deleteIds(v) {
      delete v.id;
      delete v.created_at;
      delete v.updated_at;
    }
    // console.log()
    // const res = {}
    deleteIds(insertData);
    delete insertData.user;

    insertData.questions.forEach((v) => {
      deleteIds(v);
      v.choices.forEach((a) => {
        deleteIds(a);
      });
    });
    insertData.user_id = userId;
    const res = camelizeKeys(
      await Quiz.query()
        // .eager(eager)
        .insertGraphAndFetch(insertData)
        .first()
    );
    console.log("sql ress", res);
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

export class Section extends Model {
  static get tableName() {
    return "section";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "section.quiz_id",
          to: "quiz.id",
        },
      },
      questions: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "section.id",
          to: "question.section_id",
        },
      },
    };
  }
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
      section: {
        relation: Model.BelongsToOneRelation,
        modelClass: Section,
        join: {
          from: "question.section_id",
          to: "section.id",
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

export class Attempt extends Model {
  static get tableName() {
    return "attempt";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "attempt.quiz_id",
          to: "quiz.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "attempt.user_id",
          to: "user.id",
        },
      },
      answers: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: "attempt.id",
          to: "answer.attempt_id",
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
      attempt: {
        relation: Model.BelongsToOneRelation,
        modelClass: Attempt,
        join: {
          from: "answer.attempt_id",
          to: "attempt.id",
        },
      },
      question: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "answer.question_id",
          to: "question.id",
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