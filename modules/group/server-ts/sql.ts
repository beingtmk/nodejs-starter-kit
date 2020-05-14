import {
  camelizeKeys,
  decamelizeKeys
  //  decamelize
} from 'humps';
import {
  Model
  // raw
} from 'objection';
import {
  knex
  // returnId
  //  orderedFor
} from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
// import { has } from 'lodash';

Model.knex(knex);

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
const eager = '[member, group]';
const gEager = '[members.[member]]';

export default class Group extends Model {
  static get tableName() {
    return 'group';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      members: {
        relation: Model.HasManyRelation,
        groupClass: GroupMember,
        join: {
          from: 'group.id',
          to: 'group_member.group_id'
        }
      }
    };
  }

  public async groups() {
    return camelizeKeys(
      await Group.query()
        .eager(gEager)
        .orderBy('id', 'desc')
    );
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
        .where({ email })
        .orderBy('id', 'desc')
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
    return knex('group')
      .where({ id })
      .del();
  }
}

export class GroupMember extends Model {
  // private id: any;

  static get tableName() {
    return 'group_member';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      member: {
        relation: Model.BelongsToOneRelation,
        groupClass: User,
        join: {
          from: 'group_member.email',
          to: 'user.email'
        }
      },
      group: {
        relation: Model.BelongsToOneRelation,
        groupClass: Group,
        join: {
          from: 'group_member.group_id',
          to: 'group.id'
        }
      }
    };
  }

  public async allGroupMembers() {
    return camelizeKeys(
      await GroupMember.query()
        .eager(eager)
        .orderBy('id', 'desc')
    );
  }

  public async groupMembers(id: number) {
    return camelizeKeys(
      await GroupMember.query()
        .where({ group_id: id })
        .eager(eager)
        .orderBy('id', 'desc')
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
    return knex('group_member')
      .where({ id })
      .del();
  }
}
