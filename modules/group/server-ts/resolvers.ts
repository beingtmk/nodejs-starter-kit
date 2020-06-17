import { PubSub, withFilter } from 'graphql-subscriptions';
import withAuth from 'graphql-auth';
import { GroupInput, GroupMemberInput, Identifier } from './sql';

const GROUP_SUBSCRIPTION = 'group_subscription';
const GMEMBER_SUBSCRIPTION = 'groupMembers_subscription';

interface AddGroup {
  input: GroupInput;
}

interface EditGroup {
  input: GroupInput & Identifier;
}

interface EditGroupMember {
  input: GroupMemberInput & Identifier;
}

interface AddGroupMember {
  input: GroupMemberInput;
}

export default (pubsub: PubSub) => ({
  Query: {
    async allGroupMembers(obj: any, args: any, context: any) {
      return context.GroupMember.allGroupMembers();
    },
    async groupMembers(obj: any, { id }: Identifier, { GroupMember }: any) {
      return GroupMember.groupMembers(id);
    },
    async groupMember(obj: any, { id }: Identifier, context: any) {
      return context.GroupMember.groupMember(id);
    },
    async groups(obj: any, args: any, context: any) {
      return context.Group.groups();
    },
    async userGroups(obj: any, { email }: EmailIdentifier, context: any) {
      return context.Group.userGroups(email);
    },
    async group(obj: any, { id }: Identifier, context: any) {
      return context.Group.group(id);
    }
  },
  Mutation: {
    addGroup: withAuth(async (obj: any, { input }: AddGroup, { Group }: any) => {
      try {
        const id = await Group.addGroup(input);
        const item = await Group.group(id);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'CREATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    updateGroup: withAuth(async (obj: any, { input }: EditGroup, { Group }: any) => {
      try {
        await Group.updateGroup(input);
        const item = await Group.group(input.id);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return item;
      } catch (e) {
        return e;
      }
    }),
    deleteGroup: withAuth(async (obj: any, { id }: Identifier, { Group }: any) => {
      try {
        const data = await Group.group(id);
        await Group.deleteGroup(id);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'DELETED',
            node: data
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    }),
    addGroupMember: withAuth(async (obj: any, { input }: AddGroupMember, { Group, GroupMember }: any) => {
      try {
        const id = await GroupMember.addGroupMember(input);
        const data = await GroupMember.groupMember(id);
        pubsub.publish(GMEMBER_SUBSCRIPTION, {
          groupMembersUpdated: {
            mutation: 'CREATED',
            node: data
          }
        });
        const item = await Group.group(data.groupId);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    }),
    editGroupMember: withAuth(async (obj: any, { input }: EditGroupMember, { GroupMember, Group }: any) => {
      try {
        const inputId = await GroupMember.editGroupMember(input);
        const data = await GroupMember.groupMember(inputId);
        pubsub.publish(GMEMBER_SUBSCRIPTION, {
          groupMembersUpdated: {
            mutation: 'UPDATED',
            node: data
          }
        });
        const item = await Group.group(data.groupId);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    }),
    deleteGroupMember: withAuth(async (obj: any, { id }: Identifier, { GroupMember, Group }: any) => {
      try {
        const data = await GroupMember.groupMember(id);
        await GroupMember.deleteGroupMember(id);
        pubsub.publish(GMEMBER_SUBSCRIPTION, {
          groupMembersUpdated: {
            mutation: 'DELETED',
            node: data
          }
        });
        const item = await Group.group(data.groupId);
        pubsub.publish(GROUP_SUBSCRIPTION, {
          groupUpdated: {
            mutation: 'UPDATED',
            node: item
          }
        });
        return data;
      } catch (e) {
        return e;
      }
    })
  },
  Subscription: {
    groupUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GROUP_SUBSCRIPTION),
        (payload, variables) => {
          return payload.groupUpdated.id === variables.id;
        }
      )
    },
    groupMembersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GMEMBER_SUBSCRIPTION),
        (payload, variables) => {
          return payload.groupMembersUpdated.id === variables.id;
        }
      )
    }
  }
});
