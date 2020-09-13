import {
  camelizeKeys,
  decamelizeKeys,
  //  decamelize
} from "humps";
import {
  Model,
  // raw
} from "objection";
import {
  knex,
  // returnId
  //  orderedFor
} from "@gqlapp/database-server-ts";
import { User } from "@gqlapp/user-server-ts/sql";
import Quiz from "@gqlapp/quiz-server-ts/sql";
import { has } from "lodash";

Model.knex(knex);

export interface FilterInput {
  searchText: string;
}

export interface GroupMemberInput {
  email: string;
  type: string;
  status: string;
  groupId: number;
}

export interface GroupInput {
  title: string;
  avatar: string;
  description: string;
  groupType: string;
  members: MemberInput[];
}

export interface MemberInput {
  id: number;
  email: string;
  type: string;
  status: string;
}

export interface Identifier {
  id: number;
}

export interface EmailIdentifier {
  email: string;
}

// const eager = '[author.[profile], group]';
const eager = "[member, group]";
const gEager = "[members.[member]]";

export default class Group extends Model {
  static get tableName() {
    return "group";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: GroupMember,
        join: {
          from: "group.id",
          to: "group_member.group_id",
        },
      },
      subGroups: {
        relation: Model.HasManyRelation,
        modelClass: Group,
        join: {
          from: "group.id",
          to: "group.group_id",
        },
      },
      groupQuizzes:{
        relation: Model.HasManyRelation,
        modelClass: GroupModel,
        join: {
          from: "group.id",
          to: "group_model.group_id",
        },
      },
    };
  }

  public async groups(
    filter: FilterInput,
    limit: number,
    after: number,
    groupId: number
  ) {
    const queryBuilder = Group.query()
      .eager(gEager)
      .orderBy("id", "desc");

    if (groupId) {
      queryBuilder.where("group.group_id", groupId);
    } else {
      queryBuilder.whereNull("group.group_id");
    }

    if (filter) {
      if (has(filter, "searchText") && filter.searchText !== "") {
        queryBuilder.where(function() {
          this.where(
            knex.raw("LOWER(??) LIKE LOWER(?)", [
              "group.title",
              `%${filter.searchText}%`,
            ])
          )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "group.description",
                `%${filter.searchText}%`,
              ])
            )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "group.group_type",
                `%${filter.searchText}%`,
              ])
            )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "group_member.email",
                `%${filter.searchText}%`,
              ])
            )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "user.username",
                `%${filter.searchText}%`,
              ])
            )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "user_profile.first_name",
                `%${filter.searchText}%`,
              ])
            )
            .orWhere(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "user_profile.last_name",
                `%${filter.searchText}%`,
              ])
            );
        });
      }
    }

    queryBuilder
      .from("group")
      .leftJoin("group_member", "group.id", "group_member.group_id")
      .leftJoin("user", "user.email", "group_member.email")
      .leftJoin("user_profile", "user_profile.user_id", "user.id")
      .groupBy("group.id")
      .orderBy("id", "desc");

    const allGroups = camelizeKeys(await queryBuilder);
    const total = allGroups.length;

    let groups = {};
    if (limit && after) {
      groups = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    } else if (limit && !after) {
      groups = camelizeKeys(await queryBuilder.limit(limit));
    } else if (!limit && after) {
      groups = camelizeKeys(await queryBuilder.offset(after));
    } else {
      groups = camelizeKeys(await queryBuilder);
    }
    return { groups, total };
  }

  public async group(id: number) {
    const res = camelizeKeys(
      await Group.query()
        .eager(gEager)
        .findById(id)
    );
    return res;
  }

  public async userGroups(email: EmailIdentifier) {
    const res = camelizeKeys(
      await Group.query()
        .eager(gEager)
        .from("group")
        .leftJoin("group_member", "group.id", "group_member.group_id")
        .where({ email })
        .whereNull("group.group_id")
        .orderBy("id", "desc")
    );
    return res;
  }

  public async addGroup(input: GroupInput) {
    const res = await Group.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async updateGroup(input: GroupInput & Identifier) {
    const res = await Group.query()
      .patch(decamelizeKeys(input))
      .findById(input.id);
    return res.id;
  }

  public async upsertGroup(input: GroupInput & Identifier) {
    const res = await Group.query().upsertGraph(decamelizeKeys(input));
    // const newGroup = await Group.query
    return res;
  }

  public async deleteGroup(id: number) {
    return knex("group")
      .where({ id })
      .del();
  }
}

class GroupMember extends Model {
  // private id: any;

  static get tableName() {
    return "group_member";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      member: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "group_member.email",
          to: "user.email",
        },
      },
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: "group_member.group_id",
          to: "group.id",
        },
      },
    };
  }

  public async allGroupMembers() {
    return camelizeKeys(
      await GroupMember.query()
        .eager(eager)
        .orderBy("id", "desc")
    );
  }

  public async groupMembers(id: number) {
    return camelizeKeys(
      await GroupMember.query()
        .where({ group_id: id })
        .eager(eager)
        .orderBy("id", "desc")
    );
  }

  public async groupMember(id: number) {
    const res = camelizeKeys(
      await GroupMember.query()
        .eager(eager)
        .findById(id)
    );
    return res;
  }

  public async addGroupMember(input: GroupMemberInput) {
    const res = await GroupMember.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async editGroupMember(input: Identifier & GroupMemberInput) {
    const res = await GroupMember.query().upsertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteGroupMember(id: number) {
    return knex("group_member")
      .where({ id })
      .del();
  }

  public async changeGroupMemberType(input: any) {
    const res = await GroupMember.query()
      .patch({ type: input.type })
      .findById(input.id);

    return res;
  }
}

class GroupModel extends Model {
  // private id: any;

  static get tableName() {
    return "group_model";
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
          from: "group_model.model_id",
          to: "quiz.id",
        },
      },
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: "group_model.group_id",
          to: "group.id",
        },
      },
    };
  }
  public async groupQuizzes(groupId: number) {
    return camelizeKeys(
      await GroupModel.query()
        .where({ group_id: groupId })
        .andWhere({model:'quiz'})
        .withGraphFetched("[quiz]")
        .orderBy("id", "desc")
    );
  }
  public async groupQuiz(id: number) {
    return camelizeKeys(
      await GroupModel.query()
        .findById(id).first()
    );
  }
  public async groupQuizByParams(groupId: number, modelId:number, model:string) {
    return camelizeKeys(
      await GroupModel.query()
        .where({ group_id: groupId })
        .andWhere({model_id: modelId})
        .andWhere({model:model})
        .first()
    );
  }
  public async addGroupQuiz(input: GroupMemberInput) {
    const res = await GroupMember.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteGroupQuiz(id: number) {
    return knex("group_model")
      .where({ id })
      .del();
  }
}

export {GroupMember, GroupModel};
