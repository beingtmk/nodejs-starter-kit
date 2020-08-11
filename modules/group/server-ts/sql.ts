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
    };
  }

  public async groups(filter: FilterInput, limit: number, after: number) {
    const queryBuilder = Group.query()
      .eager(gEager)
      .orderBy("id", "desc");

    if (filter) {
      if (has(filter, "searchText") && filter.searchText !== "") {
        queryBuilder
          .from("group as g")
          .leftJoin("group_member as gp", "g.id", "gp.group_id")
          .leftJoin("user as u", "u.email", "gp.email")
          .leftJoin("user_profile AS up", "up.user_id", "u.id")
          .where(function() {
            this.where(
              knex.raw("LOWER(??) LIKE LOWER(?)", [
                "g.title",
                `%${filter.searchText}%`,
              ])
            )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "g.description",
                  `%${filter.searchText}%`,
                ])
              )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "g.group_type",
                  `%${filter.searchText}%`,
                ])
              )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "gp.email",
                  `%${filter.searchText}%`,
                ])
              )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "u.username",
                  `%${filter.searchText}%`,
                ])
              )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "up.first_name",
                  `%${filter.searchText}%`,
                ])
              )
              .orWhere(
                knex.raw("LOWER(??) LIKE LOWER(?)", [
                  "up.last_name",
                  `%${filter.searchText}%`,
                ])
              );
          });
      }
    }

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
        .from("group as g")
        .leftJoin("group_member as gp", "g.id", "gp.group_id")
        .where({ email })
        .orderBy("id", "desc")
    );
    return res;
  }

  public async addGroup(input: GroupInput) {
    const res = await Group.query().insertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async updateGroup(input: GroupInput & Identifier) {
    const res = await Group.query().upsertGraph(decamelizeKeys(input));
    return res.id;
  }

  public async deleteGroup(id: number) {
    return knex("group")
      .where({ id })
      .del();
  }
}

export class GroupMember extends Model {
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
    console.log('changeGroupMemberTypeSQLINPUT', input);
    const res = await GroupMember.query()
      .patch({ type: input.type })
      .where("email", input.userEmail)
      .andWhere("group_id", input.groupId);

      console.log('changeGroupMemberTYpeSQLOUTPUT', res)
    return res;
  }
}
